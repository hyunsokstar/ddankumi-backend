// result.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Exam } from './exam.entity';
import { UsersModel } from '../../users/entities/user.entity';

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Exam)
    exam: Exam;

    @ManyToOne(() => UsersModel)
    user: UsersModel;

    @Column()
    score: number;

    @Column('json', { nullable: true })
    incorrectAnswers: { problemId: number, correctOptionId: number, selectedOptionId: number }[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    submittedAt: Date;
}