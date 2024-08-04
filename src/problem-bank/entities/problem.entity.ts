// problem.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Exam } from './exam.entity';
import { AnswerOption } from './answer-option.entity'; // Import the Option type

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    question: string;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => Exam, exam => exam.problems)
    exam: Exam;

    @OneToMany(() => AnswerOption, option => option.problem)
    options: AnswerOption[]; // Use Option as a type annotation

    @Column()
    correctOptionId: number;
}