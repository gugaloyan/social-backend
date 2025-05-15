import { Request, Response } from 'express';
import { searchUsers } from '../services/user-service';

export const searchUsersHandler = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, age } = req.query;

    const users = await searchUsers({
      firstName: firstName as string,
      lastName: lastName as string,
      age: age ? Number(age) : undefined,
    });

    res.status(200).json({ users });
  } catch (error: any) {
    res.status(500).json({ message: 'Error searching for users', error: error.message });
  }
};
