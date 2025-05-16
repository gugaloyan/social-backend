import express from 'express';
import { acceptFriendRequest, declineFriendRequest, getFriendRequests, sendFriendRequestHandler } from '../controllers/friend-request-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const router = express.Router();

/**
 * @openapi
 * /api/friend-requests:
 *   get:
 *     summary: Get pending friend requests for the current user
 *     tags:
 *       - Friend Request
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending friend requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   status:
 *                     type: string
 *                     example: pending
 *                   requester_id:
 *                     type: integer
 *                     example: 5
 *                   first_name:
 *                     type: string
 *                     example: Alice
 *                   last_name:
 *                     type: string
 *                     example: Johnson
 *                   age:
 *                     type: integer
 *                     example: 25
 *                   email:
 *                     type: string
 *                     example: alice@example.com
 */
router.get('/', authMiddleware, getFriendRequests);

/**
 * @openapi
 * /api/friend-requests:
 *   post:
 *     summary: Send a friend request to another user
 *     tags:
 *       - Friend Request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *             properties:
 *               receiverId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Friend request sent successfully
 *       400:
 *         description: Invalid input or friend request already exists
 */
router.post('/',authMiddleware, sendFriendRequestHandler);

/**
 * @openapi
 * /api/friend-requests/accept:
 *   post:
 *     summary: Accept a pending friend request
 *     tags:
 *       - Friend Request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *             properties:
 *               receiverId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Friend request accepted and friendship created
 *       404:
 *         description: Friend request not found or already processed
 *       500:
 *         description: Server error
 */
router.post('/accept', authMiddleware, acceptFriendRequest);

/**
 * @openapi
 * /api/friend-requests/decline:
 *   post:
 *     summary: Decline a pending friend request
 *     tags:
 *       - Friend Request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *             properties:
 *               receiverId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Friend request declined
 *       404:
 *         description: Friend request not found or already processed
 *       500:
 *         description: Server error
 */
router.post('/decline', authMiddleware, declineFriendRequest);


export default router;
