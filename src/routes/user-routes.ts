import express from 'express';
import { searchUsersHandler } from '../controllers/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const router = express.Router();


/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search for users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: User's first name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: User's last name
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: User's age
 *     responses:
 *       200:
 *         description: List of users matching search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       first_name:
 *                         type: string
 *                         example: John
 *                       last_name:
 *                         type: string
 *                         example: Doe
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
 *                       age:
 *                         type: integer
 *                         example: 25
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error searching for users
 */
router.get('/search', authMiddleware, searchUsersHandler);

export default router;
