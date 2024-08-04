import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Problem } from './entities/problem.entity';

@Injectable()
export class ProblemBankService {

  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,

    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,

    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,

  ) { }

  // getAllExamList
  async getAllExamList() {
    return await this.examRepository.find();
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
