export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age?: number;
  }

  export interface UserSearchQuery {
    firstName?: string;
    lastName?: string;
    age?: number;
  }

  export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    age: number | null;
    password: string; 
  }
  