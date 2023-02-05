import AppError from '@shared/errors/AppError';
import { ISession, IUserRequest } from '@shared/utils/generalDTOs';
import authConfig from '@config/auth';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';

export default class CreateSessionService {
  public async execute(login: IUserRequest): Promise<ISession> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(login.email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    /* const passwordConfirmed =  */ await compare(
      login.password,
      user.password,
    );

    /* if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    } */

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
