import { IUserRequest } from '@shared/utils/generalDTOs';
import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const login: IUserRequest = request.body;

    const createSession = new CreateSessionService();

    const user = await createSession.execute({
      email: login.email,
      password: login.password,
    });

    return response.json(user);
  }
}
