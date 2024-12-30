import { Request, Response } from 'express';
import Inscripcion from '../models/inscripcion';
import Evento from '../models/evento'; 

export const getInscripciones = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const userInscripciones = await Inscripcion.findAll({
            where: {
                id_usuario: parseInt(id),
            },
        });

        if (userInscripciones.length === 0) {
            res.status(404).json({ message: 'No se encontraron inscripciones para este usuario' });
            return;
        }

        res.status(200).json(userInscripciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las inscripciones' });
    }
};

export const createInscripcion = async (req: Request, res: Response): Promise<void> => {
    const { id_evento, id_usuario } = req.body;

    if (!id_evento || !id_usuario) {
        res.status(400).json({ message: 'Todos los campos son requeridos' });
        return;
    }

    try {
        const evento = await Evento.findByPk(id_evento);

        if (!evento) {
            res.status(404).json({ message: 'Evento no encontrado' });
            return;
        }

        if (evento.available_slots <= 0) {
            res.status(400).json({ message: 'No hay lugares disponibles para este evento' });
            return;
        }

        evento.available_slots -= 1;
        await evento.save();

        const newInscripcion = await Inscripcion.create({
            id_evento,
            id_usuario,
        });

        res.status(201).json({ message: 'Inscripción creada!', inscripcion: newInscripcion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la inscripción' });
    }
};

export const deleteInscripcion = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const inscripcion = await Inscripcion.findByPk(parseInt(id));

        if (!inscripcion) {
            res.status(404).json({ message: 'Inscripción no encontrada' });
            return;
        }

        const evento = await Evento.findByPk(inscripcion.id_evento);

        if (!evento) {
            res.status(404).json({ message: 'Evento no encontrado' });
            return;
        }

        evento.available_slots += 1;
        await evento.save();

        await inscripcion.destroy();

        res.status(200).json({ message: 'Inscripción eliminada!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la inscripción' });
    }
};
