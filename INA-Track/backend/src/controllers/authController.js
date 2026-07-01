import bcrypt from 'bcryptjs';
import { createId, publicUser, readData, writeData } from '../data/store.js';
import { roles } from '../models/User.js';
import { signToken } from '../middleware/authMiddleware.js';

const SALT_ROUNDS = 10;

export async function login(req, res) {
  const { email, password } = req.body;
  const user = readData().users.find((item) => item.email.toLowerCase() === email?.toLowerCase());

  const isValidPassword = user
    ? user.password?.startsWith('$2')
      ? await bcrypt.compare(password, user.password)
      : password === user.password
    : false;

  if (!user || !isValidPassword) {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  return res.json({ token: signToken(user), user: publicUser(user) });
}

export async function register(req, res) {
  const data = readData();
  const { firstName, lastName, email, password, role = 'student' } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Completa nombre, apellido, correo y contrasena' });
  }

  if (!roles.includes(role)) {
    return res.status(400).json({ message: 'Rol invalido' });
  }

  const exists = data.users.some((user) => user.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(409).json({ message: 'Ese correo ya esta registrado' });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = {
    id: createId('user'),
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    totalXp: 0,
    currentLevel: 1,
    createdAt: new Date().toISOString()
  };

  data.users.push(user);
  writeData(data);

  return res.status(201).json({ token: signToken(user), user: publicUser(user) });
}
