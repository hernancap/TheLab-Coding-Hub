import express, { Router } from 'express';
import { registerUser, loginUser, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/usuario.controller.js';

const usuarioRouter: Router = express.Router();

usuarioRouter.post('/register', registerUser);
usuarioRouter.post('/login', loginUser);
usuarioRouter.get('/', getAllUsers);
usuarioRouter.get('/:id', getUser);
usuarioRouter.put('/:id', updateUser);
usuarioRouter.delete('/:id', deleteUser);

export default usuarioRouter;
