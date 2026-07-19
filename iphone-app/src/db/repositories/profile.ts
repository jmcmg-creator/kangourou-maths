import type { Database } from '../database.js';
import type { Profile } from '../types.js';

interface ProfileRow {
  id: string;
  name: string;
  aid: string;
  avatar: string;
  age_range: string | null;
  main_dragon: string;
  created_at: number;
  updated_at: number;
  last_active: number | null;
}

const rowToProfile = (r: ProfileRow): Profile => ({
  id: r.id,
  name: r.name,
  aid: r.aid,
  avatar: r.avatar,
  ageRange: r.age_range,
  mainDragon: r.main_dragon,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  lastActive: r.last_active
});

export class ProfileRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string): Promise<Profile | null> {
    const rows = await this.db.query<ProfileRow>(
      'SELECT * FROM profiles WHERE id = ?',
      [id]
    );
    const r = rows[0];
    return r ? rowToProfile(r) : null;
  }

  async findByAid(aid: string): Promise<Profile | null> {
    const rows = await this.db.query<ProfileRow>(
      'SELECT * FROM profiles WHERE aid = ?',
      [aid]
    );
    const r = rows[0];
    return r ? rowToProfile(r) : null;
  }

  async list(): Promise<Profile[]> {
    const rows = await this.db.query<ProfileRow>(
      'SELECT * FROM profiles ORDER BY last_active DESC'
    );
    return rows.map(rowToProfile);
  }

  async upsert(profile: Profile): Promise<void> {
    const existing = await this.findById(profile.id);
    if (existing) {
      await this.db.execute(
        'UPDATE profiles SET name = ?, aid = ?, avatar = ?, age_range = ?, main_dragon = ?, updated_at = ?, last_active = ? WHERE id = ?',
        [
          profile.name,
          profile.aid,
          profile.avatar,
          profile.ageRange,
          profile.mainDragon,
          profile.updatedAt,
          profile.lastActive,
          profile.id
        ]
      );
    } else {
      await this.db.execute(
        'INSERT INTO profiles (id, name, aid, avatar, age_range, main_dragon, created_at, updated_at, last_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          profile.id,
          profile.name,
          profile.aid,
          profile.avatar,
          profile.ageRange,
          profile.mainDragon,
          profile.createdAt,
          profile.updatedAt,
          profile.lastActive
        ]
      );
    }
  }

  async touch(id: string): Promise<void> {
    await this.db.execute(
      'UPDATE profiles SET last_active = ? WHERE id = ?',
      [Date.now(), id]
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.execute('DELETE FROM profiles WHERE id = ?', [id]);
  }
}
