import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const User = db.user;

// Define custom request type to include userId
interface CustomRequest extends Request {
  userId?: number;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token || typeof token !== 'string') {
    return res.status(403).json({ message: 'No token provided!' });
  }

  const actualToken = token.startsWith('Bearer ')
    ? token.slice(7, token.length)
    : token;

  jwt.verify(actualToken, process.env.SECRET as string, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: 'No user ID found!' });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const roles = await user.getRoles();

    for (const role of roles) {
      if (role.name === 'admin') {
        return next();
      }
    }

    return res.status(403).json({ message: 'Require Admin Role!' });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

const isModerator = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: 'No user ID found!' });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const roles = await user.getRoles();

    for (const role of roles) {
      if (role.name === 'moderator') {
        return next();
      }
    }

    return res.status(403).json({ message: 'Require Moderator Role!' });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

const isModeratorOrAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: 'No user ID found!' });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const roles = await user.getRoles();

    for (const role of roles) {
      if (role.name === 'moderator' || role.name === 'admin') {
        return next();
      }
    }

    return res
      .status(403)
      .json({ message: 'Require Moderator or Admin Role!' });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};

export default authJwt;
