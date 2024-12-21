import { Request, Response } from 'express';

export const registerUser = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
        return;
    }

    res.status(201).json({ message: `Usuario ${username} registrado!` });
};

export const loginUser = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
        return;
    }

    if (username === 'admin' && password === '12345') {
        res.status(200).json({ 
            message: 'Login exitoso!', 
            token: 'fake-jwt-token' 
        });
    } else {
        res.status(401).json({ message: 'Usuario o contraseña inválidos.' });
    }
};
