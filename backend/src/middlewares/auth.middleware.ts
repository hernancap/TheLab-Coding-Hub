import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Falta configurar el secret de JWT");
  }

interface AuthenticatedRequest extends Request {
  user?: any; 
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token requerido' }); 
    return; 
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Token inválido' }); 
      return; 
    }
    (req as AuthenticatedRequest).user = user;  
    next();  
  });
};

export const authorizeRole = (role: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role !== role) {
      res.status(403).json({ message: 'Forbidden' }); 
      return; 
    }
    next();  
  };
};
