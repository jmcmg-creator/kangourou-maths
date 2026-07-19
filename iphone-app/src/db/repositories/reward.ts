import type { Database } from '../database.js';
import type { Reward } from '../types.js';

interface Row {
  profile_id: string;
  reward_id: string;
  reward_type: Reward['rewardType'];
  unlocked_at: number;
}

const map = (r: Row): Reward => ({
  profileId: r.profile_id,
  rewardId: r.reward_id,
  rewardType: r.reward_type,
  unlockedAt: r.unlocked_at
});

export class RewardRepository {
  constructor(private readonly db: Database) {}

  async list(profileId: string): Promise<Reward[]> {
    const rows = await this.db.query<Row>(
      'SELECT * FROM rewards WHERE profile_id = ?',
      [profileId]
    );
    return rows.map(map);
  }

  async has(profileId: string, rewardId: string): Promise<boolean> {
    const rows = await this.db.query<Row>(
      'SELECT * FROM rewards WHERE profile_id = ? AND reward_id = ?',
      [profileId, rewardId]
    );
    return rows.length > 0;
  }

  /** Idempotent : ne crée pas de doublon si déjà débloqué. */
  async unlock(reward: Reward): Promise<boolean> {
    if (await this.has(reward.profileId, reward.rewardId)) return false;
    await this.db.execute(
      'INSERT INTO rewards (profile_id, reward_id, reward_type, unlocked_at) VALUES (?, ?, ?, ?)',
      [reward.profileId, reward.rewardId, reward.rewardType, reward.unlockedAt]
    );
    return true;
  }
}
