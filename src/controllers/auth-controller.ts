import { Request, Response } from 'express';
import { login, register } from '../services/auth-service';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, age } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const user = await register({ firstName, lastName, email, password, age });

    console.info({ message: 'User registered successfully', user })

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    res.status(500).json({ message: 'Registration error', error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const data = await login(email, password);

      console.info({ message: 'Successful login', ...data })
  
      res.status(200).json({ message: 'Successful login', ...data });
    } catch (error: any) {
      res.status(401).json({ message: 'Login error', error: error.message });
    }
  };
