import { Router } from 'express';
import { getFriendsList } from '../controllers/friendship-controller';
import { authMiddleware } from '../middleware/auth-middleware';


const router = Router();

router.get('/', authMiddleware, getFriendsList);

export default router;
