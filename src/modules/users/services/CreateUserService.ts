import AppError from '@shared/errors/AppError';
import { IUserRequest } from '@shared/utils/generalDTOs';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';

export default class CreateUserService {
  public async execute(data: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }
    const hashedPassword = await hash(data.password, 8);
    const user = usersRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
