import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemBankService } from './problem-bank.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';


@Controller('problem-bank')
export class ProblemBankController {
  constructor(private readonly problemBankService: ProblemBankService) { }



  // exam 추가
  @Post('exam')
  create(@Body() createExamDto: CreateExamDto) {
    // exam 모델에 대해 생성 서비스 함수 호출
    return this.problemBankService.createOneExam(createExamDto);
  }

  // exam 추가
  @Patch('exam/:id')
  updateOneExam(@Param('id') id: number, @Body() updateExamDto: UpdateExamDto) {
    return this.problemBankService.updateOneExam(id, updateExamDto);
  }

  // exam list
  @Get('exam')
  findAll() {
    // exam 모델에 대해 모든 리스트 가져 오는 서비스 함수 호출
    return this.problemBankService.getAllExamList();
  }

}
