import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.join(__dirname, 'database.json');

const initialData = {
  users: [
    {
      id: 'user-1',
      firstName: 'Valeria',
      lastName: 'Mora',
      email: 'valeria@INARA.test',
      password: 'demo123',
      role: 'student',
      totalXp: 1280,
      currentLevel: 3,
      createdAt: '2026-06-20T10:00:00.000Z'
    },
    {
      id: 'user-2',
      firstName: 'Marco',
      lastName: 'Solis',
      email: 'marco@INARA.test',
      password: 'demo123',
      role: 'instructor',
      totalXp: 0,
      currentLevel: 1,
      createdAt: '2026-06-20T10:00:00.000Z'
    },
    {
      id: 'user-3',
      firstName: 'Admin',
      lastName: 'INA',
      email: 'admin@INARA.test',
      password: 'demo123',
      role: 'admin',
      totalXp: 0,
      currentLevel: 1,
      createdAt: '2026-06-20T10:00:00.000Z'
    }
    ,
    {
      id: 'user-4',
      firstName: 'Luis',
      lastName: 'García',
      email: 'luis.parent@INARA.test',
      password: 'demo123',
      role: 'parent',
      phone: '+5491123456789',
      totalXp: 0,
      currentLevel: 1,
      createdAt: '2026-06-20T10:00:00.000Z'
    }
  ],
  courses: [
    {
      id: 'course-1',
      name: 'Ingles Conversacional',
      instructor: 'Marco Solis',
      status: 'active',
      createdAt: '2026-06-20T10:00:00.000Z'
    },
    {
      id: 'course-2',
      name: 'Tecnologias Digitales',
      instructor: 'Equipo INA',
      status: 'active',
      createdAt: '2026-06-20T10:00:00.000Z'
    }
  ],
  attendance: [
    {
      id: 'attendance-1',
      userId: 'user-1',
      courseId: 'course-1',
      sessionDate: '2026-06-20',
      status: 'present',
      notes: 'Asistio a tiempo',
      recordedAt: '2026-06-20T10:00:00.000Z'
    }
  ],
  levels: [
    { levelNumber: 1, name: 'Inicial', minXp: 0 },
    { levelNumber: 2, name: 'Aprendiz', minXp: 500 },
    { levelNumber: 3, name: 'Constante', minXp: 1200 },
    { levelNumber: 4, name: 'Avanzado', minXp: 2500 },
    { levelNumber: 5, name: 'Experto', minXp: 5000 }
  ],
  achievements: [
    {
      id: 'achievement-1',
      code: 'first-attendance',
      name: 'Primera asistencia',
      description: 'Registro su primera asistencia.',
      xpReward: 100
    },
    {
      id: 'achievement-2',
      code: 'streak-5',
      name: 'Cinco dias constantes',
      description: 'Alcanzo una racha de cinco dias.',
      xpReward: 250
    },
    {
      id: 'achievement-3',
      code: 'level-3',
      name: 'Nivel constante',
      description: 'Alcanzo el nivel 3.',
      xpReward: 150
    }
  ],
  userAchievements: [
    {
      id: 'user-achievement-1',
      userId: 'user-1',
      achievementId: 'achievement-1',
      earnedAt: '2026-06-20T10:00:00.000Z'
    }
  ],
  xpEvents: [
    {
      id: 'xp-1',
      userId: 'user-1',
      points: 100,
      source: 'attendance',
      description: 'Asistencia registrada',
      createdAt: '2026-06-20T10:00:00.000Z'
    }
  ],
  streaks: [
    {
      id: 'streak-1',
      userId: 'user-1',
      courseId: 'course-1',
      currentCount: 4,
      bestCount: 7,
      lastActivityDate: '2026-06-20',
      updatedAt: '2026-06-20T10:00:00.000Z'
    }
  ],
  parentRelations: [
    {
      id: 'relation-1',
      parentId: 'user-4',
      childId: 'user-1'
    }
  ],
  notifications: [],
  competencyRoutes: [
    {
      id: 'route-1',
      name: 'Mecánica Automotriz',
      description: 'Rutas prácticas para dominar el taller mecánico en INATEC.',
      icon: '🔧',
      missions: [
        {
          id: 'mission-1',
          title: 'Inspección de motor',
          description: 'Revisa y documenta el estado del motor en una ficha técnica.',
          xp: 120,
          category: 'Taller',
          evidenceType: 'photo'
        },
        {
          id: 'mission-2',
          title: 'Cambio de aceite',
          description: 'Realiza el cambio de aceite y registra los pasos en un informe.',
          xp: 150,
          category: 'Proceso',
          evidenceType: 'document'
        },
        {
          id: 'mission-3',
          title: 'Ajuste de frenos',
          description: 'Ajusta los frenos y comprueba su funcionamiento de forma segura.',
          xp: 180,
          category: 'Seguridad',
          evidenceType: 'photo'
        }
      ]
    },
    {
      id: 'route-2',
      name: 'Tecnologías de la Información',
      description: 'Rutas para fortalecer informática, redes y soporte técnico.',
      icon: '💻',
      missions: [
        {
          id: 'mission-4',
          title: 'Instalación de red local',
          description: 'Configura una red local y documenta la topología.',
          xp: 130,
          category: 'Redes',
          evidenceType: 'document'
        },
        {
          id: 'mission-5',
          title: 'Seguridad informática básica',
          description: 'Aplica medidas de seguridad en un equipo y registra los resultados.',
          xp: 140,
          category: 'Seguridad',
          evidenceType: 'document'
        },
        {
          id: 'mission-6',
          title: 'Soporte técnico',
          description: 'Resuelve un problema técnico y documenta el proceso.',
          xp: 110,
          category: 'Soporte',
          evidenceType: 'document'
        }
      ]
    }
  ],
  userCompetencyProgress: [
    {
      id: 'progress-1',
      userId: 'user-1',
      routeId: 'route-1',
      completedMissions: ['mission-1'],
      startedAt: '2026-06-20T10:00:00.000Z',
      updatedAt: '2026-06-21T14:00:00.000Z'
    }
  ],
  evidences: [
    {
      id: 'evidence-1',
      progressId: 'progress-1',
      missionId: 'mission-1',
      type: 'photo',
      title: 'Motor inspeccionado',
      description: 'Fotografía de la inspección visual del motor.',
      url: 'https://via.placeholder.com/400x250',
      createdAt: '2026-06-21T14:10:00.000Z'
    }
  ]
};

function ensureDatabase() {
  if (!fs.existsSync(databasePath)) {
    fs.writeFileSync(databasePath, JSON.stringify(initialData, null, 2));
  }
}

export function readData() {
  ensureDatabase();
  return JSON.parse(fs.readFileSync(databasePath, 'utf8'));
}

export function writeData(data) {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  return data;
}

export function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function publicUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

export function isParentOf(data, parentId, childId) {
  return (data.parentRelations || []).some((relation) => relation.parentId === parentId && relation.childId === childId);
}

export function updateUserLevel(user, levels) {
  const level = [...levels].sort((a, b) => b.minXp - a.minXp).find((item) => user.totalXp >= item.minXp);
  user.currentLevel = level?.levelNumber || 1;
}

export function awardXp(data, userId, points, source, description) {
  const user = data.users.find((item) => item.id === userId);
  if (!user || !points) return null;

  user.totalXp = Math.max(0, user.totalXp + points);
  updateUserLevel(user, data.levels);

  const xpEvent = {
    id: createId('xp'),
    userId,
    points,
    source,
    description,
    createdAt: new Date().toISOString()
  };
  data.xpEvents.unshift(xpEvent);

  if (user.currentLevel >= 3) unlockAchievement(data, userId, 'level-3');
  return xpEvent;
}

export function unlockAchievement(data, userId, code) {
  const achievement = data.achievements.find((item) => item.code === code);
  if (!achievement) return null;

  const exists = data.userAchievements.some((item) => item.userId === userId && item.achievementId === achievement.id);
  if (exists) return null;

  const unlocked = {
    id: createId('user-achievement'),
    userId,
    achievementId: achievement.id,
    earnedAt: new Date().toISOString()
  };

  data.userAchievements.unshift(unlocked);

  if (achievement.xpReward > 0) {
    const user = data.users.find((item) => item.id === userId);
    if (user) {
      user.totalXp += achievement.xpReward;
      updateUserLevel(user, data.levels);
      data.xpEvents.unshift({
        id: createId('xp'),
        userId,
        points: achievement.xpReward,
        source: 'achievement',
        description: `Logro: ${achievement.name}`,
        createdAt: new Date().toISOString()
      });
    }
  }

  return unlocked;
}
