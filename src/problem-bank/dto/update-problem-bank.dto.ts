import { PartialType } from '@nestjs/swagger';
import { CreateProblemBankDto } from './create-problem-bank.dto';

export class UpdateProblemBankDto extends PartialType(CreateProblemBankDto) {}
