import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryDatabase } from '../../src/db/database.js';
import { runMigrations } from '../../src/db/migrations/index.js';
import { ProfileRepository } from '../../src/db/repositories/profile.js';

async function setup() {
  const db = new MemoryDatabase();
  await runMigrations(db);
  return { db, profiles: new ProfileRepository(db) };
}

describe('ProfileRepository', () => {
  let ctx: Awaited<ReturnType<typeof setup>>;
  beforeEach(async () => { ctx = await setup(); });

  it('upsert crée un nouveau profil', async () => {
    await ctx.profiles.upsert({
      id: 'id1',
      name: 'Test',
      aid: 'aid1',
      avatar: '{}',
      ageRange: '8-10',
      mainDragon: 'main',
      createdAt: 1000,
      updatedAt: 1000,
      lastActive: 1000
    });
    const found = await ctx.profiles.findById('id1');
    expect(found?.name).toBe('Test');
    expect(found?.aid).toBe('aid1');
  });

  it('upsert met à jour un profil existant', async () => {
    const base = {
      id: 'id2', name: 'A', aid: 'aid2', avatar: '{}',
      ageRange: null, mainDragon: 'main',
      createdAt: 1000, updatedAt: 1000, lastActive: null
    };
    await ctx.profiles.upsert(base);
    await ctx.profiles.upsert({ ...base, name: 'B', updatedAt: 2000 });
    const list = await ctx.profiles.list();
    expect(list).toHaveLength(1);
    expect(list[0]!.name).toBe('B');
  });

  it('findByAid retourne le bon profil', async () => {
    await ctx.profiles.upsert({
      id: 'id3', name: 'Anna', aid: 'aid-anna', avatar: '{}',
      ageRange: null, mainDragon: 'main',
      createdAt: 1, updatedAt: 1, lastActive: null
    });
    const found = await ctx.profiles.findByAid('aid-anna');
    expect(found?.name).toBe('Anna');
  });

  it('delete supprime le profil', async () => {
    await ctx.profiles.upsert({
      id: 'id4', name: 'X', aid: 'aid-x', avatar: '{}',
      ageRange: null, mainDragon: 'main',
      createdAt: 1, updatedAt: 1, lastActive: null
    });
    await ctx.profiles.delete('id4');
    expect(await ctx.profiles.findById('id4')).toBeNull();
  });
});
