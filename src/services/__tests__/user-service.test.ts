import { getUserByEmail, createUser, searchUsers } from '../user-service';
import * as db from '../../config/db';
import * as queryBuilder from '../../utile/query-builder';

jest.mock('../../config/db');

describe('User Service', () => {
  const mockQuery = db.query as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserByEmail', () => {
    it('should return user when email exists', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      mockQuery.mockResolvedValue({ rows: [mockUser] });

      const result = await getUserByEmail('test@example.com');

      expect(result).toEqual(mockUser);
    });

    it('should return null when email does not exist', async () => {
      mockQuery.mockResolvedValue({ rows: [] });

      const result = await getUserByEmail('notfound@example.com');

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should insert and return created user', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '123456',
        age: 30,
      };

      const mockUser = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        age: 30,
      };

      mockQuery.mockResolvedValue({ rows: [mockUser] });

      const result = await createUser(userData);

      expect(mockQuery).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('searchUsers', () => {
    it('should return found users from search', async () => {
      const searchQuery = { firstName: 'Jane' };

      const mockQueryResult = [
        { id: 1, first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', age: 28 },
      ];

      jest.spyOn(queryBuilder, 'buildUserSearchQuery').mockReturnValue({
        whereClause: `WHERE first_name ILIKE $1`,
        values: ['%Jane%'],
      });

      mockQuery.mockResolvedValue({ rows: mockQueryResult });

      const result = await searchUsers(searchQuery);

      expect(result).toEqual(mockQueryResult);
    });
  });
});
