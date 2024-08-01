import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModel } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('test-data-grid')
  async getUsersForTestDataGrid(): Promise<Partial<UsersModel>[]> {
    return await this.usersService.findUsersForTestDataGrid();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // 선생님 정보만 가져오는 api 추가
  @Get('teachers')
  findTeachers() {
    return this.usersService.findTeachers();
  }
}
