import { readData } from '../data/store.js';

export function achievementSummary(req, res) {
  const data = readData();
  const earned = data.userAchievements
    .filter((item) => item.userId === req.params.userId)
    .map((item) => ({
      ...item,
      achievement: data.achievements.find((achievement) => achievement.id === item.achievementId)
    }));

  return res.json({
    achievements: data.achievements,
    earnedAchievements: earned,
    streaks: data.streaks.filter((streak) => streak.userId === req.params.userId)
  });
}
