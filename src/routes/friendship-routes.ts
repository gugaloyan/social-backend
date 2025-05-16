import { Router } from 'express';
import { getFriendsList } from '../controllers/friendship-controller';
import { authMiddleware } from '../middleware/auth-middleware';


const router = Router();

/**
 * @swagger
 * /api/friends:
 *   get:
 *     summary: Get list of user's friends
 *     tags: [Friendship]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of friends
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
 *                   first_name:
 *                     type: string
 *                     example: John
 *                   last_name:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch friends
 */
router.get('/', authMiddleware, getFriendsList);

export default router;
