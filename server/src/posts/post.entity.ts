import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' }) // Explícito
  title!: string;

  @Column({ type: 'varchar' }) // Explícito
  slug!: string;

  @Column({ type: 'varchar' }) // Explícito
  category!: string;

  @Column({ type: 'text' }) // Explícito (texto longo)
  content!: string;

  @Column({ type: 'varchar', nullable: true }) // Explícito
  image!: string;

  @Column({ type: 'text', nullable: true }) // Mudei para 'text' para caber resumos maiores
  excerpt!: string;

  @CreateDateColumn()
  createdAt!: Date;
}