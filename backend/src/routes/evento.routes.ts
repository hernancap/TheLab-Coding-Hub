import express, { Router } from 'express';
import { createEvent, getAllEvents, updateEvent, deleteEvent, getEvent } from '../controllers/evento.controller.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';

const eventoRouter: Router = express.Router();

eventoRouter.post('/', authenticateToken, authorizeRole('admin'), createEvent);
eventoRouter.get('/', authenticateToken, getAllEvents);
eventoRouter.put('/:id', authenticateToken, authorizeRole('admin'), updateEvent);
eventoRouter.delete('/:id', authenticateToken, authorizeRole('admin'), deleteEvent);
eventoRouter.get('/:id', authenticateToken, authorizeRole('admin'), getEvent);

export default eventoRouter;
