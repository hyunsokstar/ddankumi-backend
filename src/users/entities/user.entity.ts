// src/users/entities/user.entity.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export enum GenderType {
  MAN = 'man',
  WOMAN = 'woman',
}

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, default: '1122' })
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: UserType, nullable: true })
  role: UserType;

  @CreateDateColumn({ nullable: true })
  join_date: Date;

  @Column({ type: 'boolean', default: true })
  is_visible: boolean;

  @Column({ nullable: true })
  teacher_code: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login_date: Date;

  @Column({ type: 'int', nullable: true })
  current_enrollments: number;

  @Column({ type: 'int', nullable: true })
  total_payments: number;

  @Column({ type: 'text', nullable: true })
  completed_courses: string;

  @Column({ type: 'int', nullable: true })
  average_score: number;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'enum', enum: GenderType, nullable: true })
  gender: GenderType;

  @Column({ type: 'text', nullable: true })
  hobby: string;
}
