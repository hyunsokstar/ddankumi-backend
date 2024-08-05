// src/problem-bank/dto/create-problem.dto.ts
import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAnswerOptionDto {
    @IsString()
    text: string;
}

export class CreateProblemDto {
    @IsString()
    question: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsNumber()
    correctOptionId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(5)
    @ArrayMaxSize(5)
    @Type(() => CreateAnswerOptionDto)
    options: CreateAnswerOptionDto[];
}