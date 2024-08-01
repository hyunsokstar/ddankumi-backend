import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel, UserType } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async findUsersForTestDataGrid(): Promise<Partial<UsersModel>[]> {
    return await this.usersRepository.find({
      select: ['id', 'email', 'name', 'age', 'gender', 'hobby']
    });
  }

  async findAll(): Promise<UsersModel[]> {
    return await this.usersRepository.find();
  }

  async findTeachers(): Promise<Partial<UsersModel>[]> {
    const teachers = await this.usersRepository.find({
      where: {
        role: UserType.TEACHER,
        is_visible: true,
      },
      select: [
        'email',
        'name',
        'role',
        'join_date',
        'is_visible',
        'teacher_code',
      ], // 필요한 필드만 선택
    });

    return teachers.map((teacher) => ({
      email: teacher.email,
      name: teacher.name,
      role: teacher.role,
      join_date: teacher.join_date,
      is_visible: teacher.is_visible,
      teacher_code: teacher.teacher_code,
    }));
  }
}
