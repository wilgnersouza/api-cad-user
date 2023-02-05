import User from '@modules/users/typeorm/entities/User';

export interface IProductRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IUserRequest {
  name?: string;
  email: string;
  password: string;
}

export interface ISession {
  user: User;
  token: string;
}
