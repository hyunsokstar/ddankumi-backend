// src/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserType {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin'
}

@Entity()
export class UsersModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    name: string;

    @CreateDateColumn()
    join_date: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_login_date: Date;

    @Column({ type: 'enum', enum: UserType, nullable: false })
    user_type: UserType;

    @Column({ type: 'int', default: 0 })
    current_enrollments: number;

    @Column({ type: 'int', default: 0 })
    total_payments: number;

    @Column({ type: 'text', nullable: true })
    completed_courses: string;

    @Column({ type: 'int', nullable: true })
    average_score: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}