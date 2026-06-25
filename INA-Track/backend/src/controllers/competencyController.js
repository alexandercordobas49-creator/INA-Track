import { readData, writeData, createId } from '../data/store.js';

export function listRoutes(req, res) {
  const data = readData();
  return res.json({ routes: data.competencyRoutes || [] });
}

export function getRoute(req, res) {
  const data = readData();
  const route = (data.competencyRoutes || []).find((item) => item.id === req.params.routeId);
  if (!route) return res.status(404).json({ message: 'Ruta no encontrada' });
  return res.json(route);
}

export function getUserProgress(req, res) {
  const data = readData();
  const userId = req.params.userId;
  const student = data.users.find((item) => item.id === userId);
  if (!student) return res.status(404).json({ message: 'Usuario no encontrado' });

  if (req.user.role === 'student' && req.user.id !== userId) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  if (req.user.role === 'parent' && !isParentOf(data, req.user.id, userId)) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  const progress = data.userCompetencyProgress.filter((item) => item.userId === userId);
  return res.json({ progress });
}

export function completeMission(req, res) {
  const data = readData();
  const { userId, routeId, missionId, evidence } = req.body;
  if (req.user.role === 'student' && req.user.id !== userId) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  if (req.user.role === 'parent' && !isParentOf(data, req.user.id, userId)) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  const route = (data.competencyRoutes || []).find((item) => item.id === routeId);
  if (!route) return res.status(404).json({ message: 'Ruta no encontrada' });

  const mission = route.missions.find((item) => item.id === missionId);
  if (!mission) return res.status(404).json({ message: 'Misión no encontrada' });

  let progress = data.userCompetencyProgress.find((item) => item.userId === userId && item.routeId === routeId);
  if (!progress) {
    progress = {
      id: createId('progress'),
      userId,
      routeId,
      completedMissions: [],
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.userCompetencyProgress.push(progress);
  }

  if (!progress.completedMissions.includes(missionId)) {
    progress.completedMissions.push(missionId);
    progress.updatedAt = new Date().toISOString();
  }

  if (evidence) {
    const evidenceRecord = {
      id: createId('evidence'),
      progressId: progress.id,
      missionId,
      type: evidence.type,
      title: evidence.title,
      description: evidence.description,
      url: evidence.url || '',
      createdAt: new Date().toISOString()
    };
    data.evidences = data.evidences || [];
    data.evidences.push(evidenceRecord);
  }

  writeData(data);
  return res.json({ progress });
}

export function getRouteProgress(req, res) {
  const data = readData();
  const progress = (data.userCompetencyProgress || []).find((item) => item.userId === req.params.userId && item.routeId === req.params.routeId);
  return res.json({ progress });
}
