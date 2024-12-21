import express, { Router } from 'express';
import { createEvent, getEvents } from '../controllers/evento.controller.js';

const eventoRouter: Router = express.Router();

eventoRouter.post('/', createEvent);
eventoRouter.get('/', getEvents);

export default eventoRouter;
