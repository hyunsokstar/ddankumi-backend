// src/auth/dto/signup-user-dto.ts
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserType } from 'src/users/entities/user.entity';

export class SignUpUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsEnum(UserType)
    @IsOptional()
    role?: UserType;
}
