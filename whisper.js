/* ════════ WHISPER — reconnaissance vocale dans le navigateur ════════
   Utilise transformers.js (HuggingFace) pour faire tourner un modèle
   Whisper localement (Xenova/whisper-tiny par défaut, ~40 Mo cachés
   ensuite en IndexedDB). 100% client-side : l'audio enfant ne quitte
   jamais l'appareil. Tombe en repli sur la Web Speech API si le modèle
   ne peut être chargé (vieux iPhone, hors-ligne 1re fois, etc.).
*/
(function(){
  'use strict';

  const MODEL_ID='Xenova/whisper-tiny';      // ~40 Mo. Pour plus de précision : whisper-base (~75 Mo)
  const CDN_URL='https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
  const TARGET_SR=16000;                       // Whisper attend du 16 kHz mono

  let _pipelinePromise=null;
  let _transformers=null;
  let _mediaRecorder=null;
  let _stream=null;
  let _chunks=[];

  function _emitProgress(stage,pct,extra){
    window.dispatchEvent(new CustomEvent('whisper:progress',{detail:{stage,pct:pct||0,extra:extra||null}}));
  }

  async function _loadTransformers(){
    if(_transformers) return _transformers;
    _emitProgress('loading-lib');
    _transformers=await import(/* webpackIgnore: true */ CDN_URL);
    // Force la récup distante (pas de modèles locaux dans le bundle)
    _transformers.env.allowLocalModels=false;
    _transformers.env.useBrowserCache=true;
    return _transformers;
  }

  async function getWhisperPipeline(){
    if(_pipelinePromise) return _pipelinePromise;
    _pipelinePromise=(async()=>{
      const lib=await _loadTransformers();
      _emitProgress('downloading-model',0);
      const pipe=await lib.pipeline('automatic-speech-recognition',MODEL_ID,{
        progress_callback:(p)=>{
          if(p.status==='progress'&&p.file&&typeof p.progress==='number'){
            _emitProgress('downloading-model',p.progress,p.file);
          }else if(p.status==='ready'){
            _emitProgress('ready',100);
          }
        }
      });
      _emitProgress('ready',100);
      return pipe;
    })();
    return _pipelinePromise;
  }

  // Vérifie support navigateur sans déclencher de chargement
  function isWhisperAvailable(){
    return !!(window.WebAssembly && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && typeof MediaRecorder!=='undefined');
  }

  function _pickMimeType(){
    const candidates=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg'];
    for(const m of candidates){
      if(MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(m)) return m;
    }
    return '';
  }

  // Démarre l'enregistrement micro. Retourne un objet { stop } pour arrêter.
  async function startWhisperRecording(onResult,onError){
    if(!isWhisperAvailable()){
      if(onError) onError(new Error('Whisper indisponible sur ce navigateur'));
      return null;
    }
    try{
      _stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,sampleRate:TARGET_SR,echoCancellation:true,noiseSuppression:true}});
    }catch(e){
      if(onError) onError(e);
      return null;
    }
    const mime=_pickMimeType();
    _chunks=[];
    _mediaRecorder=new MediaRecorder(_stream,mime?{mimeType:mime}:undefined);
    _mediaRecorder.ondataavailable=(e)=>{if(e.data&&e.data.size>0) _chunks.push(e.data)};
    _mediaRecorder.onstop=async()=>{
      try{
        if(_stream){_stream.getTracks().forEach(t=>t.stop());_stream=null}
        const blob=new Blob(_chunks,{type:mime||'audio/webm'});
        if(blob.size<200){
          if(onResult) onResult('');
          return;
        }
        _emitProgress('decoding-audio');
        const arrayBuffer=await blob.arrayBuffer();
        const Ctx=window.AudioContext||window.webkitAudioContext;
        const ctx=new Ctx();
        const audioBuf=await ctx.decodeAudioData(arrayBuffer);
        // Mix down to mono + resample to 16kHz si nécessaire
        const float32=_toMono16k(audioBuf);
        try{ctx.close()}catch(e){}
        _emitProgress('transcribing');
        const pipe=await getWhisperPipeline();
        const result=await pipe(float32,{language:'french',task:'transcribe',chunk_length_s:30,stride_length_s:5});
        const text=(result&&result.text||'').trim();
        if(onResult) onResult(text);
        _emitProgress('done',100);
      }catch(e){
        if(onError) onError(e);
      }
    };
    _mediaRecorder.start();
    return {stop:()=>stopWhisperRecording()};
  }

  function stopWhisperRecording(){
    try{
      if(_mediaRecorder&&_mediaRecorder.state!=='inactive') _mediaRecorder.stop();
    }catch(e){}
  }

  function _toMono16k(audioBuf){
    const srcSR=audioBuf.sampleRate;
    const nCh=audioBuf.numberOfChannels;
    // Mono : moyenne des canaux
    const len=audioBuf.length;
    const mono=new Float32Array(len);
    for(let c=0;c<nCh;c++){
      const ch=audioBuf.getChannelData(c);
      for(let i=0;i<len;i++) mono[i]+=ch[i]/nCh;
    }
    if(srcSR===TARGET_SR) return mono;
    // Resampling linéaire vers 16kHz (rapide, qualité suffisante pour Whisper)
    const ratio=srcSR/TARGET_SR;
    const newLen=Math.floor(len/ratio);
    const out=new Float32Array(newLen);
    for(let i=0;i<newLen;i++){
      const srcIdx=i*ratio;
      const j=Math.floor(srcIdx);
      const frac=srcIdx-j;
      out[i]=(mono[j]||0)*(1-frac)+(mono[j+1]||0)*frac;
    }
    return out;
  }

  // Pré-charge le modèle (à appeler quand on entre dans l'écran poésie)
  function prefetchWhisperModel(){
    if(!isWhisperAvailable()) return;
    try{getWhisperPipeline()}catch(e){}
  }

  // Exports globaux (l'app n'est pas modulaire)
  window.Whisper={
    isAvailable:isWhisperAvailable,
    start:startWhisperRecording,
    stop:stopWhisperRecording,
    prefetch:prefetchWhisperModel,
    getPipeline:getWhisperPipeline
  };
})();
