// src/problem-bank/dto/create-problem.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProblemDto {
    @IsString()
    question: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsNumber()
    correctOptionId?: number;
}