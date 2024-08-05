import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProblemBankService } from './problem-bank.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateProblemDto } from './dto/create-problem-dto';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';

@Controller('problem-bank')
export class ProblemBankController {
  constructor(private readonly problemBankService: ProblemBankService) { }

  // 시험 삭제
  @Delete('exam/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeExam(@Param('id', ParseIntPipe) id: number) {
    return this.problemBankService.removeExam(id);
  }

  @Post('exam/:examId/problems')
  @HttpCode(HttpStatus.CREATED)
  createMultiProblem(
    @Param('examId', ParseIntPipe) examId: number,
    @Body() createProblemDto: CreateProblemDto[]
  ) {
    return this.problemBankService.createMultiProblem(examId, createProblemDto);
  }

  // problem list 가져 오는데 특정 시험에 대한 문제들만 가져 오기
  @Get('exam/:examId/problem')
  findAllProblemByExamId(@Param('examId', ParseIntPipe) examId: number) {
    return this.problemBankService.getAllProblemForExamId(examId);
  }

  // exam list
  @Get('exam')
  findAllExam() {
    // exam 모델에 대해 모든 리스트 가져 오는 서비스 함수 호출
    return this.problemBankService.getAllExamList();
  }

  // exam list
  @Get('exam-only/')
  findAllExamOnly() {
    // exam 모델에 대해 모든 리스트 가져 오는 서비스 함수 호출
    return this.problemBankService.getAllExamListOnly();
  }


  // 특정 문제에 대해 옵션 5개 한번에 추가
  @Post('problem/:problemId/options')
  @HttpCode(HttpStatus.CREATED)
  async createAnswerOptions(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() createAnswerOptionsDto: CreateAnswerOptionDto[]
  ) {
    const result = await this.problemBankService.createAnswerOptions(problemId, createAnswerOptionsDto);
    return result;
  }

  @Post('problem/:problemId/option')
  @HttpCode(HttpStatus.CREATED)
  async createAnswerOption(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() createAnswerOptionDto: CreateAnswerOptionDto
  ) {
    const result = await this.problemBankService.createAnswerOption(problemId, createAnswerOptionDto);
    return result;
  }

  // 특정 id의 problem 삭제
  @Delete('problem/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeProblem(@Param('id', ParseIntPipe) id: number) {
    return this.problemBankService.removeProblem(id);
  }

  @Post('exam/:examId/problem')
  @HttpCode(HttpStatus.CREATED)
  createProblem(
    @Param('examId', ParseIntPipe) examId: number,
    @Body() createProblemDto: CreateProblemDto
  ) {
    return this.problemBankService.createProblem(examId, createProblemDto);
  }

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

}
