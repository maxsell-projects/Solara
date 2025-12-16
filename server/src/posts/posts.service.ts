import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) throw new NotFoundException('Post não encontrado');
    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.postsRepository.findOneBy({ slug });
    if (!post) throw new NotFoundException('Post não encontrado');
    return post;
  }

  create(data: Partial<Post>) {
    const post = this.postsRepository.create(data);
    return this.postsRepository.save(post);
  }

  async update(id: number, data: Partial<Post>) {
    await this.findOne(id); // Garante que existe
    await this.postsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.postsRepository.remove(post);
  }
}