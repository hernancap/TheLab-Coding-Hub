import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const users = [
    { id: 1, username: 'admin', password: '123456', email: 'test@test.com', role: 'admin' },
    { id: 2, username: 'user', password: 'password', email: 'user@test.com', role: 'user' },
];

const generateToken = (user: { id: number; username: string; role: string }) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, {
        expiresIn: '1h',
    });
};

export const registerUser = (req: Request, res: Response): void => {
    const { username, password, email, role = 'user' } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
        return;
    }
    
    users.push({ id: users.length + 1, username, email, password, role });
    res.status(201).json({ message: `Usuario ${username} registrado!` });
};

export const loginUser = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
        return;
    }

    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        res.status(401).json({ message: 'Usuario o contraseña inválidos.' });
        return;
    }

    const token = generateToken(user);

    res.status(200).json({
        message: 'Login exitoso!',
        token,
    });

};

export const getAllUsers = (req: Request, res: Response): void => {
    const { role } = req.body;

    res.status(200).json(users);
};

export const getUser = (req: Request, res: Response): void => {
    const { id } = req.params;

    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
    }

    res.status(200).json(user);
};

export const updateUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { username, password, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
    }

    user.username = username || user.username;
    user.password = password || user.password;
    user.email = email || user.email;

    res.status(200).json({ message: `Usuario ${id} actualizado!` });
};

export const deleteUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    
    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: `Usuario ${id} eliminado!` });
};
