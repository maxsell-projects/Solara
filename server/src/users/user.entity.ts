import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true }) // <--- Explícito
  email!: string;

  @Column({ type: 'varchar' }) // <--- Explícito
  password!: string;
}