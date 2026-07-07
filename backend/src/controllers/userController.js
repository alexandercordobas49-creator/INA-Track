import { publicUser, readData, writeData } from '../data/store.js';
import { roles } from '../models/User.js';

export function listUsers(req, res) {
  return res.json(readData().users.map(publicUser));
}

export function listRoles(req, res) {
  return res.json([
    { value: 'student', label: 'Estudiante' },
    { value: 'instructor', label: 'Docente' },
    { value: 'admin', label: 'Administrador' },
    { value: 'parent', label: 'Padre de familia' }
  ]);
}

export function createParentRelation(req, res) {
  const data = readData();
  const { parentId, childId } = req.body;

  const parent = data.users.find((u) => u.id === parentId);
  const child = data.users.find((u) => u.id === childId);

  if (!parent || parent.role !== 'parent') return res.status(400).json({ message: 'Padre inválido' });
  if (!child || child.role !== 'student') return res.status(400).json({ message: 'Estudiante inválido' });

  data.parentRelations = data.parentRelations || [];
  const exists = data.parentRelations.some((r) => r.parentId === parentId && r.childId === childId);
  if (exists) return res.status(409).json({ message: 'Relación ya existe' });

  const relation = { id: `relation-${Date.now()}`, parentId, childId };
  data.parentRelations.push(relation);
  writeData(data);

  return res.status(201).json(relation);
}

export function deleteParentRelation(req, res) {
  const data = readData();
  const rel = data.parentRelations.find((r) => r.id === req.params.id);
  if (!rel) return res.status(404).json({ message: 'Relación no encontrada' });
  data.parentRelations = data.parentRelations.filter((r) => r.id !== req.params.id);
  writeData(data);
  return res.json({ message: 'Eliminado' });
}

export function updateRole(req, res) {
  const data = readData();
  const user = data.users.find((item) => item.id === req.params.id);

  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  if (!roles.includes(req.body.role)) return res.status(400).json({ message: 'Rol invalido' });

  user.role = req.body.role;
  writeData(data);

  return res.json(publicUser(user));
}
