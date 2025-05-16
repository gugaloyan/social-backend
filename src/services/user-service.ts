import { query} from '../config/db';
import { User, UserInput, UserSearchQuery } from '../types/user';
import { buildUserSearchQuery } from '../utile/query-builder';

export const createUser = async (data: UserInput): Promise<Omit<User, 'password'>> => {
  const { firstName, lastName, email, password, age } = data;

  const result = await query(
    `
    INSERT INTO users (first_name, last_name, email, password, age)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, email, age
    `,
    [firstName, lastName, email, password, age || null]
  );

  return result.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        return null;
      }
  
    return result.rows[0];
  };

  export const searchUsers = async (searchQuery: UserSearchQuery): Promise<Omit<User, 'password'>[]> => {
    const { whereClause, values } = buildUserSearchQuery(searchQuery);
    const queryText = `SELECT id, first_name, last_name, email, age FROM users ${whereClause}`;
    const result = await query(queryText, values);
    return result.rows;
  };
  