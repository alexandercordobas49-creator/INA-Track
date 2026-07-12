import jwt from 'jsonwebtoken';
import { readData } from '../data/store.js';

const JWT_SECRET = process.env.JWT_SECRET || 'INARA-secret';

export function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const data = readData();
    const user = data.users.find((item) => item.id === payload.id);
    if (!user) return res.status(401).json({ message: 'Token inválido' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
}

export function isParentOf(data, parentId, childId) {
  return (data.parentRelations || []).some((relation) => relation.parentId === parentId && relation.childId === childId);
}
