import express from 'express';
import { searchUsersHandler } from '../controllers/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const router = express.Router();

router.get('/search', authMiddleware, searchUsersHandler);

export default router;
