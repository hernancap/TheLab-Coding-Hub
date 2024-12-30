import { Request, Response } from 'express';
import Event from '../models/evento';

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, description, date, available_slots } = req.body;

        if (!title || !description || !date || !available_slots) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        const newEvent = await Event.create({ title, description, date, available_slots });

        res.status(201).json({ message: `Evento "${title}" creado!`, event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
};

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = await Event.findAll(); 
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los eventos', error });
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, date, available_slots } = req.body;

    try {
        const event = await Event.findByPk(id); 

        if (!event) {
            res.status(404).json({ message: 'Evento no encontrado' });
            return;
        }

        if (!title || !description || !date) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        await event.update({ title, description, date, available_slots }); 

        res.status(200).json({ message: `Evento "${title}" actualizado!`, event });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el evento', error });
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);

        if (!event) {
            res.status(404).json({ message: 'Evento no encontrado' });
            return;
        }

        await event.destroy(); 

        res.status(200).json({ message: `Evento "${event.title}" eliminado!` });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el evento', error });
    }
};

export const getEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id); 

        if (!event) {
            res.status(404).json({ message: 'Evento no encontrado' });
            return;
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento', error });
    }
};


