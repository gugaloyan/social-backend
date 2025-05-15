
import { db }from '../config/db';


export const areUsersAlreadyFriends = async (
  userId: number,
  friendId: number
): Promise<boolean> => {
  const result = await db.query(
    `SELECT 1 FROM friendships WHERE user_id = $1 AND friend_id = $2`,
    [userId, friendId]
  );

  return result.rowCount !== null && result.rowCount > 0;
};

export const getFriends = async (userId: number) => {
    const result = await db.query(
      `SELECT u.id, u.first_name, u.last_name, u.email
       FROM friendships f
       JOIN users u ON u.id = f.friend_id
       WHERE f.user_id = $1`,
      [userId]
    );

    
    return result.rows;
  };