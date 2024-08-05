// src/exam/dto/create-exam.dto.ts
import { IsString, IsInt, IsArray, IsOptional, IsDateString } from 'class-validator';

export class CreateExamDto {
    @IsString()
    name: string;

    @IsInt()
    examinerId: number;

    @IsInt()
    @IsOptional()
    examineeId?: number;

    @IsArray()
    @IsOptional()
    problemIds?: number[];

    @IsDateString()
    @IsOptional()
    createdAt?: Date;
}