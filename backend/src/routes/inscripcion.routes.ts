import express, { Router } from 'express';
import { createInscripcion, deleteInscripcion, getInscripciones } from '../controllers/inscripcion.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const inscripcionRouter: Router = express.Router();

inscripcionRouter.post('/', authenticateToken, createInscripcion);
inscripcionRouter.delete('/:id', authenticateToken, deleteInscripcion);
inscripcionRouter.get('/:id', authenticateToken, getInscripciones);

export default inscripcionRouter;