import { NextFunction, Request, Response } from 'express';
import db from '../models/index.js';

const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if username exists
    let user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      return res
        .status(400)
        .json({ message: 'Failed! Username is already in use!' });
    }

    // Check if email exists
    user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res
        .status(400)
        .json({ message: 'Failed! Email is already in use!' });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (const role of req.body.roles) {
      if (!ROLES.includes(role)) {
        return res
          .status(400)
          .json({ message: `Failed! Role does not exist: ${role}` });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

export default verifySignUp;
