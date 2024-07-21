import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>
  ) { }

  async findAll(): Promise<UsersModel[]> {
    return await this.usersRepository.find();
  }

}
