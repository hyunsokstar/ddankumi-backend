// src\auth\dto\login-user-dto.ts
// src/auth/dto/login-user-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        example: 'user@example.com',
        description: '사용자 이메일',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123',
        description: '사용자 비밀번호',
    })
    @IsString()
    @MinLength(6)
    password: string;
}