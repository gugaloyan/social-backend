import { db } from '../config/db';
import { FriendPendingResponse, FriendRequest } from '../types/friend-request';
import { areUsersAlreadyFriends } from './friendship-service';



export const sendFriendRequest = async (
  requesterId: number,
  receiverId: number
): Promise<FriendRequest> => {
  if (requesterId === receiverId) {
    throw new Error('You cannot send a request to yourself.');
  }

  const userResult = await db.query(
    `SELECT id FROM users WHERE id = $1`,
    [receiverId]
  );

  if (userResult.rows.length === 0) {
    throw new Error(`User with receiverId ${receiverId} not found.`);
  }

  const existingRequest = await db.query(
    `SELECT * FROM friend_requests 
     WHERE requester_id = $1 AND receiver_id = $2 AND status = 'pending'`,
    [requesterId, receiverId]
  );

  if (existingRequest.rows.length > 0) {
    throw new Error('Friend request already sent.');
  }

  const alreadyFriends = await areUsersAlreadyFriends(requesterId, receiverId);
  if (alreadyFriends) {
    throw new Error('You are already friends');
  }

  const result = await db.query(
    `INSERT INTO friend_requests (requester_id, receiver_id, status)
     VALUES ($1, $2, 'pending')
     RETURNING id, requester_id, receiver_id, status, created_at`,
    [requesterId, receiverId]
  );

  return result.rows[0];
};



export const acceptRequest = async (requesterId: number, receiverId: number): Promise<boolean> => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      `UPDATE friend_requests
       SET status = 'accepted'
       WHERE requester_id = $1 AND receiver_id = $2 AND status = 'pending'`,
      [requesterId, receiverId]
    );

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return false;
    }

    await client.query(
      `INSERT INTO friendships (user_id, friend_id)
       VALUES ($1, $2), ($2, $1)`,
      [requesterId, receiverId]
    );

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error in acceptRequest:', error);
    throw error;
  } finally {
    client.release();
  }
};

  
  export const declineRequest = async (requesterId: number, receiverId: number): Promise<boolean> => {
    const result = await db.query(
      `UPDATE friend_requests
       SET status = 'declined'
       WHERE requester_id = $1 AND receiver_id = $2 AND status = 'pending'`,
      [requesterId, receiverId]
    );
  
    return (result.rowCount ?? 0) > 0;
  };
  



export const getPendingFriendRequests = async (userId: number): Promise<FriendPendingResponse[]> => {
  const result = await db.query(
    `SELECT fr.id, fr.status, fr.requester_id, u.first_name, u.last_name, u.age, u.email
     FROM friend_requests fr
     JOIN users u ON fr.requester_id = u.id
     WHERE fr.receiver_id = $1 AND fr.status = 'pending'`,
    [userId]
  );

  return result.rows;
};
