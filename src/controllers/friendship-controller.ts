
import { Response } from 'express';
import { getFriends } from '../services/friendship-service';
import { AuthRequest } from '../types/auth';

export const getFriendsList = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    const friends = await getFriends(userId);
    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch friends' });
  }
};
