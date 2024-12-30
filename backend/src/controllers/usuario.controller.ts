import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/usuario';

dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('Falta configurar el secret de JWT');
}

const generateToken = (user: { id: number; username: string; role: string }) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, secret, {
    expiresIn: '1h',
  });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email, role = 'user' } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    return;
  }

  try {
    const existingUser = await Usuario.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
      return;
    }

    const newUser = await Usuario.create({ username, password, email, role });
    res.status(201).json({ message: `Usuario ${username} registrado!`, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    return;
  }

  try {
    const user = await Usuario.findOne({ where: { username, password } });

    if (!user) {
      res.status(401).json({ message: 'Usuario o contraseña inválidos.' });
      return;
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Login exitoso!', token, id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await Usuario.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await Usuario.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  try {
    const user = await Usuario.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    user.username = username || user.username;
    user.password = password || user.password;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: `Usuario ${id} actualizado!`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await Usuario.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    await user.destroy();

    res.status(200).json({ message: `Usuario ${id} eliminado!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};
