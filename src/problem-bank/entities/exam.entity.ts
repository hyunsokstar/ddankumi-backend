// src/problem-bank/entities/exam.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UsersModel } from '../../users/entities/user.entity';
import { Problem } from './problem.entity';

@Entity()
export class Exam {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UsersModel)
    @JoinColumn({ name: 'examiner_id' })
    examiner: UsersModel;

    @ManyToOne(() => UsersModel)
    @JoinColumn({ name: 'examinee_id' })
    examinee: UsersModel;

    @OneToMany(() => Problem, problem => problem.exam)
    problems: Problem[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}