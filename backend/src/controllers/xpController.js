import { publicUser, readData } from '../data/store.js';

export function xpSummary(req, res) {
  const data = readData();
  const user = data.users.find((item) => item.id === req.params.userId);

  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  return res.json({
    user: publicUser(user),
    levels: data.levels,
    currentLevel: data.levels.find((level) => level.levelNumber === user.currentLevel),
    nextLevel: data.levels.find((level) => level.minXp > user.totalXp),
    xpEvents: data.xpEvents.filter((event) => event.userId === user.id)
  });
}
