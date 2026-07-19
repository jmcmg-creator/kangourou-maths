/**
 * Gestionnaire de packs de contenus téléchargeables (audio, illustrations
 * lourdes, packs éditoriaux). Utilise Capacitor Filesystem sur iOS, un
 * simple blob URL en dev navigateur pour test.
 *
 * Voir docs/CONTENT_DOWNLOADS.md.
 */

import type { Database } from '../db/database.js';
import type { NetworkService } from '../network/network.js';

export interface PackManifestEntry {
  id: string;
  version: string;
  size: number;
  url: string;
  sha256: string;
}

export interface DownloadedPack {
  packId: string;
  version: string;
  totalBytes: number;
  localPath: string;
  checksum: string;
  status: 'downloaded' | 'in_progress' | 'failed' | 'available';
  downloadedAt: number | null;
}

type ProgressListener = (info: { packId: string; loaded: number; total: number }) => void;

export class DownloadManager {
  private inFlight = new Set<string>();
  private listeners = new Set<ProgressListener>();

  constructor(
    private readonly db: Database,
    private readonly network: NetworkService,
    private readonly wifiOnlyGetter: () => Promise<boolean> = async () => false
  ) {}

  onProgress(fn: ProgressListener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  async list(): Promise<DownloadedPack[]> {
    const rows = await this.db.query<{
      pack_id: string;
      version: string;
      total_bytes: number;
      local_path: string;
      checksum: string;
      status: DownloadedPack['status'];
      downloaded_at: number | null;
    }>('SELECT * FROM download_packs');
    return rows.map(r => ({
      packId: r.pack_id,
      version: r.version,
      totalBytes: r.total_bytes,
      localPath: r.local_path,
      checksum: r.checksum,
      status: r.status,
      downloadedAt: r.downloaded_at
    }));
  }

  async isDownloaded(packId: string): Promise<boolean> {
    const rows = await this.db.query<{ status: string }>(
      'SELECT status FROM download_packs WHERE pack_id = ?', [packId]
    );
    return rows[0]?.status === 'downloaded';
  }

  /** Démarre le téléchargement d'un pack. Retourne quand le pack est prêt. */
  async download(pack: PackManifestEntry): Promise<{ ok: boolean; error?: string }> {
    if (this.inFlight.has(pack.id)) return { ok: false, error: 'already in flight' };
    if (!this.network.isOnline()) return { ok: false, error: 'offline' };
    if (await this.wifiOnlyGetter() && !(await this.isWifi())) {
      return { ok: false, error: 'wifi_only_setting' };
    }

    this.inFlight.add(pack.id);
    try {
      await this.upsertStatus(pack, 'in_progress');
      const bytes = await this.fetchWithProgress(pack);

      // Vérif intégrité
      const digest = await this.sha256Hex(bytes);
      if (digest.toLowerCase() !== pack.sha256.toLowerCase()) {
        await this.upsertStatus(pack, 'failed');
        return { ok: false, error: 'checksum_mismatch' };
      }

      const localPath = await this.persist(pack.id, bytes);
      await this.db.execute(
        'UPDATE download_packs SET status = ?, local_path = ?, downloaded_at = ? WHERE pack_id = ?',
        ['downloaded', localPath, Date.now(), pack.id]
      );
      return { ok: true };
    } catch (e) {
      await this.db.execute(
        'UPDATE download_packs SET status = ? WHERE pack_id = ?',
        ['failed', pack.id]
      );
      return { ok: false, error: (e as Error).message };
    } finally {
      this.inFlight.delete(pack.id);
    }
  }

  async delete(packId: string): Promise<void> {
    await this.db.execute('DELETE FROM download_packs WHERE pack_id = ?', [packId]);
    // TODO iOS : suppression des fichiers via @capacitor/filesystem
  }

  private async upsertStatus(pack: PackManifestEntry, status: DownloadedPack['status']) {
    const existing = await this.db.query<{ pack_id: string }>(
      'SELECT pack_id FROM download_packs WHERE pack_id = ?', [pack.id]
    );
    if (existing.length === 0) {
      await this.db.execute(
        'INSERT INTO download_packs (pack_id, version, total_bytes, local_path, checksum, status, downloaded_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [pack.id, pack.version, pack.size, '', pack.sha256, status, null]
      );
    } else {
      await this.db.execute(
        'UPDATE download_packs SET status = ?, version = ?, total_bytes = ?, checksum = ? WHERE pack_id = ?',
        [status, pack.version, pack.size, pack.sha256, pack.id]
      );
    }
  }

  private async fetchWithProgress(pack: PackManifestEntry): Promise<Uint8Array> {
    const res = await fetch(pack.url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    if (!res.body) {
      const buf = new Uint8Array(await res.arrayBuffer());
      this.emit(pack.id, buf.byteLength, buf.byteLength);
      return buf;
    }
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.byteLength;
      this.emit(pack.id, loaded, pack.size);
    }
    const total = new Uint8Array(loaded);
    let off = 0;
    for (const c of chunks) { total.set(c, off); off += c.byteLength; }
    return total;
  }

  private emit(packId: string, loaded: number, total: number) {
    for (const l of this.listeners) l({ packId, loaded, total });
  }

  private async sha256Hex(bytes: Uint8Array): Promise<string> {
    // Copie dans un ArrayBuffer explicite pour éviter l'erreur TS
    // « SharedArrayBuffer n'est pas assignable à ArrayBuffer ».
    const buf = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(buf).set(bytes);
    const digest = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async persist(packId: string, bytes: Uint8Array): Promise<string> {
    if (globalThis.Capacitor?.isNativePlatform?.()) {
      const { Filesystem, Directory, Encoding } = await import('@capacitor/filesystem');
      const path = `packs/${packId}.bin`;
      // base64 pour compat, en attendant @capacitor/filesystem 6 avec writeBinary
      const b64 = arrayBufferToBase64(bytes);
      await Filesystem.writeFile({
        path,
        data: b64,
        directory: Directory.Data,
        recursive: true,
        encoding: Encoding.UTF8 // ignoré quand data est base64
      });
      const uri = await Filesystem.getUri({ path, directory: Directory.Data });
      return uri.uri;
    }
    // Dev navigateur : URL blob mémoire (perdue au reload — juste pour test)
    const copy = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(copy).set(bytes);
    const blob = new Blob([copy]);
    return URL.createObjectURL(blob);
  }

  private async isWifi(): Promise<boolean> {
    if (!globalThis.Capacitor?.isNativePlatform?.()) return true;
    const { Network } = await import('@capacitor/network');
    const status = await Network.getStatus();
    return status.connectionType === 'wifi';
  }
}

function arrayBufferToBase64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin);
}
