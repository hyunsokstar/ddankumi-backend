// src\auth\dto\signup-user-dto.ts
import { IsString, IsEmail } from 'class-validator';

export class SignUpUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
}