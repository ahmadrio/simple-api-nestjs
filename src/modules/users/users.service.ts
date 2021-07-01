import { Inject, Injectable } from '@nestjs/common';
import { USER_RESPOSITORY } from 'src/core/constants';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @Inject(USER_RESPOSITORY) private readonly userRepository: typeof User
  ) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async create(user: CreateUserDto) {
    return await this.userRepository.create(user);
  }

  async update(id: number, user: UpdateUserDto) {
    return await this.userRepository.update(user, {
      where: {id},
      individualHooks: true
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {id}
    });
  }

  async destroy(id: number) {
    return await this.userRepository.destroy({
      where: {id}
    });
  }

}
