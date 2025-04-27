import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardUser } from './board-user.entity.js';
import { List } from './list.entity.js';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => List, (list) => list.board)
  lists: List[];

  @OneToMany(() => BoardUser, (boardUser) => boardUser.board)
  boardUsers: BoardUser[];
}
