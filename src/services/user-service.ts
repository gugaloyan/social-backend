import { db } from '../config/db';
import { UserInput, UserSearchQuery } from '../types/user';
import { buildUserSearchQuery } from '../utile/query-builder';

export const createUser = async (data: UserInput) => {
  const { firstName, lastName, email, password, age } = data;

  const result = await db.query(
    `
    INSERT INTO users (first_name, last_name, email, password, age)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, email, age
    `,
    [firstName, lastName, email, password, age || null]
  );

  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
  
    return result.rows[0];
  };

  export const searchUsers = async (query: UserSearchQuery) => {
    const { whereClause, values } = buildUserSearchQuery(query);
    const queryText = `SELECT id, first_name, last_name, email, age FROM users ${whereClause}`;
    const result = await db.query(queryText, values);
    return result.rows;
  };
  