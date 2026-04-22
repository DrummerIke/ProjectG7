import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ error: 'Доступ запрещен. Токен не найден' });
    }

    const decoded = jwt.verify(token, config.jwtAccessSecret) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Токен истек' });
    }
    return res.status(403).json({ error: 'Неверный токен' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Недостаточно прав' });
    }

    next();
  };
};
