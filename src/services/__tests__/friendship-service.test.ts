import { areUsersAlreadyFriends, getFriends } from '../friendship-service';
import * as db from '../../config/db';

jest.mock('../../config/db');

describe('Friendship Service', () => {

const mockQuery = db.query as jest.Mock;

  describe('areUsersAlreadyFriends', () => {
    it('should return true if friendship exists', async () => {
        mockQuery.mockResolvedValue({ rowCount: 1 });

      const result = await areUsersAlreadyFriends(1, 2);
      expect(result).toBe(true);
    });

    it('should return false if friendship does not exist', async () => {
        mockQuery.mockResolvedValue({ rowCount: 0 });

      const result = await areUsersAlreadyFriends(1, 2);
      expect(result).toBe(false);
    });
  });

  describe('getFriends', () => {
    it('should return list of friends for a user', async () => {
      const mockFriends = [
        { id: 2, first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com' },
        { id: 3, first_name: 'Bob', last_name: 'Jones', email: 'bob@example.com' }
      ];

      (db.query as jest.Mock).mockResolvedValue({ rows: mockFriends });

      const result = await getFriends(1);
      expect(result).toEqual(mockFriends);
    });

    it('should return empty array if user has no friends', async () => {
        mockQuery.mockResolvedValue({ rows: [] });

      const result = await getFriends(1);
      expect(result).toEqual([]);
    });
  });
});
