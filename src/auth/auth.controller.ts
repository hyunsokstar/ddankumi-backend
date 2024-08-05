// src\auth\auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup-user-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginUserDto } from './dto/login-user-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiOperation({ summary: '회원 가입' })
  @ApiResponse({ status: 201, description: '회원 가입에 성공했습니다.' })
  @ApiBody({ type: SignUpUserDto })
  @ApiResponse({ status: 201, description: '회원 가입에 성공했습니다.' })
  async signup(@Body() signUpUserDto: SignUpUserDto): Promise<{ message: string }> {
    await this.authService.signup(signUpUserDto);
    return { message: '회원 가입에 성공했습니다.' };
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-auth')
  @ApiOperation({ summary: '로그인 상태 확인' })
  @ApiResponse({ status: 200, description: '로그인 상태 확인 성공' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  async checkAuth(@Req() req) {
    return this.authService.checkAuth(req.user);
  }

  @Post('refresh')
  @ApiOperation({ summary: '토큰 갱신' })
  @ApiResponse({ status: 200, description: '토큰 갱신 성공' })
  async refresh(@Body('refresh_token') refresh_token: string) {
    return this.authService.refreshToken(refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: '프로필 조회' })
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  getProfile(@Req() req) {
    return req.user;
  }

}