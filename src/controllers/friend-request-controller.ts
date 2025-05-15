import { Response } from 'express';
import { acceptRequest, declineRequest, getPendingFriendRequests, sendFriendRequest } from '../services/friend-request-service';
import { AuthRequest } from '../types/auth';


export const sendFriendRequestHandler = async (req: AuthRequest, res: Response) => {
  try {
    const requesterId = req.user?.id;
    const receiverId = Number(req.body.receiverId);

    if (!requesterId || !receiverId) {
      return res.status(400).json({ message: 'User IDs are required' });
    }

    const request = await sendFriendRequest(requesterId, receiverId);

    res.status(201).json({ message: 'Application sent', request });
  } catch (error: any) {
    res.status(400).json({ message: 'Error', error: error.message });
  }
};


export const acceptFriendRequest = async (req: AuthRequest, res: Response) => {
    const requesterId = Number(req.body.receiverId); 
    const receiverId = req.user!.id;                 
  
    try {
      const success = await acceptRequest(requesterId, receiverId);
  
      if (!success) {
        return res.status(404).json({ message: 'Friend request not found or already processed' });
      }
  
      res.json({ message: 'Friend request accepted and friendship created' });
    } catch (error) {
      console.error('Error in acceptFriendRequest:', error);
      res.status(500).json({ message: 'Error accepting friend request' });
    }
  };
  
  export const declineFriendRequest = async (req: AuthRequest, res: Response) => {
    const requesterId = Number(req.body.receiverId);
    const receiverId = req.user!.id;
  
    try {
      const success = await declineRequest(requesterId, receiverId);
  
      if (!success) {
        return res.status(404).json({ message: 'Friend request not found or already processed' });
      }
  
      res.json({ message: 'Friend request declined' });
    } catch (error) {
      console.error('Error declining friend request:', error);
      res.status(500).json({ message: 'Error declining friend request' });
    }
  };
  
  export const getFriendRequests = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      const requests = await getPendingFriendRequests(userId);
      res.json(requests);
    } catch (error) {
      console.error('Error getting friend requests:', error);
      res.status(500).json({ message: 'Failed to fetch friend requests' });
    }
  };