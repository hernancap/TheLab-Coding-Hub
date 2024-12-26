import express, { Router } from 'express';
import { createEvent, getAllEvents, updateEvent, deleteEvent, getEvent } from '../controllers/evento.controller.js';

const eventoRouter: Router = express.Router();

eventoRouter.post('/', createEvent);
eventoRouter.get('/', getAllEvents);
eventoRouter.put('/:id', updateEvent);
eventoRouter.delete('/:id', deleteEvent);
eventoRouter.get('/:id', getEvent);

export default eventoRouter;
