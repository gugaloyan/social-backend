import { Request} from 'express';


export interface AuthRequest extends Request {
    user?: { id: number };
  }

  export interface AuthResponse {
    token: string;
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };
  }