import bcrypt from 'bcryptjs';
import { roles } from '../models/User.js';
import { createUser, findUserByEmail } from '../repositories/UserRepository.js';
import { signToken } from '../middleware/authMiddleware.js';

const SALT_ROUNDS = 10;


export async function login(req, res) {

  const { email, password } = req.body;


  const user = await findUserByEmail(email);


  if (!user || !(await bcrypt.compare(password, user.password_hash))) {

    return res.status(401).json({
      message: 'Credenciales invalidas'
    });

  }


  return res.json({
    token: signToken(user),
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role
    }
  });

}



export async function register(req, res) {

  const {
    firstName,
    lastName,
    email,
    password,
    role = 'student'
  } = req.body;



  if (!firstName || !lastName || !email || !password) {

    return res.status(400).json({
      message: 'Completa nombre, apellido, correo y contrasena'
    });

  }



  if (!roles.includes(role)) {

    return res.status(400).json({
      message: 'Rol invalido'
    });

  }



  const exists = await findUserByEmail(email);


  if (exists) {

    return res.status(409).json({
      message: 'Ese correo ya esta registrado'
    });

  }



  const hashedPassword = await bcrypt.hash(
    password,
    SALT_ROUNDS
  );



  const user = await createUser({

    first_name: firstName,
    last_name: lastName,
    email,
    password_hash: hashedPassword,
    role

  });



  return res.status(201).json({

    token: signToken(user),

    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role
    }

  });

}