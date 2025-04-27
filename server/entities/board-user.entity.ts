import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './board.entity.js';
import { User } from './user.entity.js';

export enum BoardUserRole {
  OWNER = 'owner',
  MODERATOR = 'moderator',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

@Entity('board_users')
export class BoardUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BoardUserRole,
    default: BoardUserRole.MEMBER,
  })
  role: BoardUserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.boardUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Board, (board) => board.boardUsers)
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
