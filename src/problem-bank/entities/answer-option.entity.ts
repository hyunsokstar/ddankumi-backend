// option.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Problem } from './problem.entity';

@Entity()
export class AnswerOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => Problem, problem => problem.options)
    problem: Problem;
}