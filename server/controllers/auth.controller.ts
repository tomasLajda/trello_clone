import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { roleRepository, userRepository } from '../entities/data-source.js';
import { User } from '../entities/user.entity.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = hashedPassword;

    const role = await roleRepository.findOne({ where: { name: 'user' } });

    if (!role) {
      return res.status(500).json({ message: 'Default role not found.' });
    }

    user.roles = [role];
    await userRepository.save(user);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { email: req.body.email },
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

    const roles = await roleRepository.find();
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
