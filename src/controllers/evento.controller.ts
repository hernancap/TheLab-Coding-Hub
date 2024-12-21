import { Request, Response } from 'express';

type Event = {
    id: number;
    title: string;
    description: string;
    date: string; 
};

const events: Event[] = [
    { id: 1, title: 'Event 1', description: 'Description 1', date: '2024-12-20' },
    { id: 2, title: 'Event 2', description: 'Description 2', date: '2024-12-22' },
];

export const createEvent = (req: Request, res: Response): void => {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
        res.status(400).json({ message: 'Todos los campos son requeridos' });
        return;
    }

    const newEvent: Event = {
        id: events.length + 1, 
        title,
        description,
        date,
    };
    events.push(newEvent);

    res.status(201).json({ message: `Evento "${title}" creado!`, event: newEvent });
};

export const getEvents = (req: Request, res: Response): void => {
    res.status(200).json(events);
};
