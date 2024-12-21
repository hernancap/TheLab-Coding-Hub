import express, { Router } from 'express';
import { registerUser, loginUser } from '../controllers/usuario.controller.js';

const usuarioRouter: Router = express.Router();

usuarioRouter.post('/register', registerUser);
usuarioRouter.post('/login', loginUser);

export default usuarioRouter;
