import express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import {
  adminBoard,
  allAccess,
  moderatorBoard,
  userBoard,
} from '../controllers/user.controller.js';
import { authJwt } from '../middlewares/index.js';

const router = express.Router();

// Public Route
router.get('/all', allAccess as RequestHandler);

// User Route
router.get(
  '/user',
  [authJwt.verifyToken as RequestHandler],
  userBoard as RequestHandler
);

// Moderator Route
router.get(
  '/mod',
  [
    authJwt.verifyToken as RequestHandler,
    authJwt.isModerator as RequestHandler,
  ],
  moderatorBoard as RequestHandler
);

// Admin Route
router.get(
  '/admin',
  [authJwt.verifyToken as RequestHandler, authJwt.isAdmin as RequestHandler],
  adminBoard as RequestHandler
);

export default router;
