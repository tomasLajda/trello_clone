import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const User: typeof db.user = db.user;
const Role: typeof db.role = db.role;

export const signup = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const role = await Role.findOne({ where: { name: 'user' } });
    if (role) {
      await user.setRoles([role]);
    } else {
      return res.status(500).json({ message: 'Default role not found.' });
    }

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User Not found.' });
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    if (!process.env.SECRET) {
      throw new Error('JWT secret is not defined in environment variables.');
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    const roles = await user.getRoles();
    const authorities = roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};
