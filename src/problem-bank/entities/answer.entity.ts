// answer.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Exam } from './exam.entity';
import { Problem } from './problem.entity';
import { UsersModel } from 'src/users/entities/user.entity';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Exam)
    exam: Exam;

    @ManyToOne(() => Problem)
    problem: Problem;

    @ManyToOne(() => UsersModel)
    user: UsersModel;

    @Column()
    selectedOptionId: number;

    @Column()
    correctOptionId: number;

    @Column()
    isCorrect: boolean;
}