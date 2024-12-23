import express, { Router } from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/evento.controller.js';

const eventoRouter: Router = express.Router();

eventoRouter.post('/', createEvent);
eventoRouter.get('/', getEvents);
eventoRouter.put('/:id', updateEvent);
eventoRouter.delete('/:id', deleteEvent);

export default eventoRouter;
