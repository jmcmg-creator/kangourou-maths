/* Adaptateur Supabase — pseudos uniques + profils + boîte à défis.
 * Zéro dépendance : appels REST directs vers les fonctions RPC PostgREST
 * (pas de SDK, compatible offline-first et CSP strict).
 * Si window.SUPABASE_CONFIG n'est pas rempli, tout est inactif et l'app
 * reste sur le système historique (Worker Cloudflare).
 */
(function(){
  'use strict';

  function cfg(){
    const c=window.SUPABASE_CONFIG||{};
    return (c.url&&c.anonKey)?c:null;
  }
  function supaEnabled(){return !!cfg()}

  async function rpc(fn,args){
    const c=cfg();
    if(!c) return {error:'non_configure'};
    try{
      const r=await fetch(c.url.replace(/\/$/,'')+'/rest/v1/rpc/'+fn,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'apikey':c.anonKey,
          'Authorization':'Bearer '+c.anonKey
        },
        body:JSON.stringify(args||{})
      });
      if(!r.ok) return {error:'http_'+r.status};
      return await r.json();
    }catch(e){return {error:'reseau'}}
  }

  // Identité locale du pseudo actif : {id, token, pseudo}, par nom de profil.
  function _credsKey(profileName){return 'royaume_supa_'+String(profileName||'').toLowerCase()}
  function getCreds(profileName){
    try{
      const raw=localStorage.getItem(_credsKey(profileName));
      if(!raw) return null;
      const c=JSON.parse(raw);
      return (c&&c.id&&c.token)?c:null;
    }catch(e){return null}
  }
  function setCreds(profileName,creds){
    try{localStorage.setItem(_credsKey(profileName),JSON.stringify(creds))}catch(e){}
  }
  function clearCreds(profileName){
    try{localStorage.removeItem(_credsKey(profileName))}catch(e){}
  }

  async function supaCheckPseudo(pseudo){return rpc('check_pseudo',{p_pseudo:pseudo})}

  async function supaRegister(profileName,pseudo,pin){
    const res=await rpc('register_player',{p_pseudo:pseudo,p_pin:pin});
    if(res&&res.id&&res.token){setCreds(profileName,{id:res.id,token:res.token,pseudo:res.pseudo})}
    return res;
  }

  async function supaLogin(profileName,pseudo,pin){
    const res=await rpc('login_player',{p_pseudo:pseudo,p_pin:pin});
    if(res&&res.id&&res.token){setCreds(profileName,{id:res.id,token:res.token,pseudo:res.pseudo})}
    return res;
  }

  // Sauvegarde du profil complet dans Postgres (fire-and-forget côté appelant).
  async function supaSaveProfile(profileName,profileData){
    const c=getCreds(profileName);
    if(!c) return {error:'pas_connecte'};
    return rpc('save_profile',{p_id:c.id,p_token:c.token,p_profile:profileData});
  }

  async function supaLoadProfile(profileName){
    const c=getCreds(profileName);
    if(!c) return null;
    const res=await rpc('load_profile',{p_id:c.id,p_token:c.token});
    return (res&&res.profile)?res.profile:null;
  }

  async function supaSendInvite(profileName,toPseudo,code,lvName,count){
    const c=getCreds(profileName);
    if(!c) return {error:'pas_connecte'};
    return rpc('send_invite',{p_id:c.id,p_token:c.token,p_to_pseudo:toPseudo,p_code:code,p_lv:lvName,p_count:count});
  }

  async function supaFetchInvites(profileName){
    const c=getCreds(profileName);
    if(!c) return [];
    const res=await rpc('fetch_invites',{p_id:c.id,p_token:c.token});
    return Array.isArray(res)?res:[];
  }

  window.Supa={
    enabled:supaEnabled,
    creds:getCreds,
    clearCreds,
    checkPseudo:supaCheckPseudo,
    register:supaRegister,
    login:supaLogin,
    saveProfile:supaSaveProfile,
    loadProfile:supaLoadProfile,
    sendInvite:supaSendInvite,
    fetchInvites:supaFetchInvites
  };
})();
