import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UsersModel> {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      join_date: new Date(),
      last_login_date: null
    });

    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<UsersModel[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UsersModel> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update({ id: id }, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete({ id: id });
  }
}
