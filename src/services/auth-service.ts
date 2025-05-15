import bcrypt from 'bcrypt';
import { UserInput } from '../types/user';
import { createUser as createUserInDb, getUserByEmail } from './user-service';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN } from '../config/constant';


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const register = async (userData: UserInput) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await createUserInDb({ ...userData, password: hashedPassword });
};


export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name } };
};