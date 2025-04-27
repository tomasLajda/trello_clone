import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './board.entity.js';
import { Card } from './card.entity.js';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Board, (board) => board.lists)
  board: Board;

  @OneToMany(() => Card, (card) => card.list)
  cards: Card[];
}
