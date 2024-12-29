import express, { Router } from 'express';
import { registerUser, loginUser, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/usuario.controller.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';

const usuarioRouter: Router = express.Router();

usuarioRouter.post('/register', registerUser);
usuarioRouter.post('/login', loginUser);

usuarioRouter.get('/', authenticateToken, authorizeRole('admin'), getAllUsers);
usuarioRouter.get('/:id', authenticateToken, authorizeRole('admin'), getUser);
usuarioRouter.put('/:id', authenticateToken, authorizeRole('admin'), updateUser);
usuarioRouter.delete('/:id', authenticateToken, authorizeRole('admin'), deleteUser);

export default usuarioRouter;
