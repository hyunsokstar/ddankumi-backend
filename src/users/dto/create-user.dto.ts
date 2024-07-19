// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsEnum, IsOptional, IsInt, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsEnum(UserType)
    user_type: UserType;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    last_login_date?: Date;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    current_enrollments?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    total_payments?: number;

    @IsOptional()
    @IsString()
    completed_courses?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    average_score?: number;
}