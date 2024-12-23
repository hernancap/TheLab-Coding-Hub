import { Request, Response } from 'express';

const users = [
    { id: 1, username: 'admin', password: '12345', role: 'admin' },
];

export const registerUser = (req: Request, res: Response): void => {
    const { username, password, role = 'user' } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
        return;
    }
    
    users.push({ id: users.length + 1, username, password, role });
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
    const { username, password } = req.body;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
    }

    user.username = username || user.username;
    user.password = password || user.password;

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
