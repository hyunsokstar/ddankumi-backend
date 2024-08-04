import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Problem } from './entities/problem.entity';
import { CreateProblemDto } from './dto/create-problem-dto';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';
import { AnswerOption } from './entities/answer-option.entity';

@Injectable()
export class ProblemBankService {

  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,

    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,

    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,

    @InjectRepository(AnswerOption)
    private readonly answerOptionRepository: Repository<AnswerOption>,

    private dataSource: DataSource
  ) { }

  async createAnswerOption(problemId: number, createAnswerOptionDto: CreateAnswerOptionDto) {
    try {
      const problem = await this.problemRepository.findOne({ where: { id: problemId } });
      if (!problem) {
        throw new NotFoundException(`Problem with ID ${problemId} not found`);
      }

      const option = this.answerOptionRepository.create({
        ...createAnswerOptionDto,
        problem,
      });

      const savedOption = await this.answerOptionRepository.save(option);

      return {
        success: true,
        message: 'Answer option created successfully',
        data: {
          id: savedOption.id,
          text: savedOption.text,
          problemId: problem.id,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create answer option');
    }
  }

  // @Delete('problem/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeProblem(@Param('id', ParseIntPipe) id: number) {
  //   return this.problemBankService.removeProblem(id);
  // } 에 대한 서비스 함수 추가
  async removeProblem(id: number) {
    const problem = await this.problemRepository.findOne({ where: { id } });
    if (!problem) {
      throw new NotFoundException(`Problem with ID ${id} not found`);
    }

    await this.problemRepository.remove(problem);
  }

  async createProblem(examId: number, createProblemDto: CreateProblemDto) {
    const exam = await this.examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found`);
    }

    const problem = this.problemRepository.create({
      ...createProblemDto,
      exam,
    });

    return this.problemRepository.save(problem);
  }

  // getAllExamList
  async getAllExamList() {
    // return await this.examRepository.find();
    // 각 시험의 문제들도 같이 가져오기
    // return await this.examRepository.find({ relations: ['problems'] });
    return await this.examRepository.find({ relations: ['problems', 'problems.options'] });
  }

  // exam 생성
  async createOneExam(createExamDto: CreateExamDto) {
    const newExam = await this.examRepository.create(createExamDto);
    await this.examRepository.save(newExam);
    return newExam;
  }

  async updateOneExam(id: number, updateExamDto: UpdateExamDto) {
    const exam = await this.examRepository.findOne({ where: { id } });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }

    // examinerId와 examineeId를 별도로 처리
    if (updateExamDto.examinerId) {
      const examiner = await this.usersRepository.findOne({ where: { id: updateExamDto.examinerId } });
      if (!examiner) {
        throw new NotFoundException(`Examiner with ID ${updateExamDto.examinerId} not found`);
      }
      exam.examiner = examiner;
    }
    if (updateExamDto.examineeId) {
      const examinee = await this.usersRepository.findOne({ where: { id: updateExamDto.examineeId } });
      if (!examinee) {
        throw new NotFoundException(`Examinee with ID ${updateExamDto.examineeId} not found`);
      }
      exam.examinee = examinee;
    }

    // 나머지 필드 업데이트
    Object.assign(exam, updateExamDto);

    // problemIds 처리
    if (updateExamDto.problemIds && updateExamDto.problemIds.length > 0) {
      const problems = await this.problemRepository.findBy({
        id: In(updateExamDto.problemIds)
      });

      if (problems.length !== updateExamDto.problemIds.length) {
        const foundIds = problems.map(p => p.id);
        const missingIds = updateExamDto.problemIds.filter(id => !foundIds.includes(id));
        throw new BadRequestException(`Some of the provided problem IDs are invalid: ${missingIds.join(', ')}`);
      }

      exam.problems = problems;
    }

    try {
      return await this.examRepository.save(exam);
    } catch (error) {
      throw new BadRequestException('Failed to update exam. Please check your input.');
    }
  }

}
