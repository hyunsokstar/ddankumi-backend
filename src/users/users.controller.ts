import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('test-data-grid')
  async getUsersForTestDataGrid(
    @Query('page') page: number = 0,
    @Query('size') size: number = 3,
  ) {
    return await this.usersService.findUsersForTestDataGrid(page, size);
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
