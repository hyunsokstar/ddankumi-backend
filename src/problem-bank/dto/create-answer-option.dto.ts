// src\problem-bank\dto\create-answer-option.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnswerOptionDto {
    @IsString()
    @IsNotEmpty()
    text: string;

}