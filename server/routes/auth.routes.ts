import express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { signin, signup } from '../controllers/auth.controller.js';
import { verifySignUp } from '../middlewares/index.js';

const router = express.Router();

// Signup Route
router.post(
  '/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail as RequestHandler,
    verifySignUp.checkRolesExisted as RequestHandler,
  ],
  signup as RequestHandler
);

// Signin Route
router.post('/signin', signin as RequestHandler);

export default router;
