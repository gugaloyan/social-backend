import express from 'express';
import { acceptFriendRequest, declineFriendRequest, getFriendRequests, sendFriendRequestHandler } from '../controllers/friend-request-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const router = express.Router();

router.get('/', authMiddleware, getFriendRequests);
router.post('/',authMiddleware, sendFriendRequestHandler);
router.post('/accept', authMiddleware, acceptFriendRequest);
router.post('/decline', authMiddleware, declineFriendRequest);


export default router;
