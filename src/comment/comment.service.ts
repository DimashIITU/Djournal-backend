import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntitly } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntitly)
    private commentRepository: Repository<CommentEntitly>,
  ) {}

  async create(dto: CreateCommentDto, userId: number) {
    const comment = await this.commentRepository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: userId },
    });
    const item = await this.commentRepository.findOneBy({ id: comment.id });
    return {
      ...item,
      post: { id: item.post.id },
    };
  }

  async findAll(postId: number) {
    const qb = this.commentRepository.createQueryBuilder('c');
    if (postId) {
      qb.where('c.postId = :postId', { postId });
    }

    const arr = await qb
      .leftJoinAndSelect('c.post', 'post')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();
    return arr.map((item) => {
      return {
        ...item,
        post: { id: item.post.id, title: item.post.title },
      };
    });
  }

  async findOne(id: number) {
    const reqId = await this.commentRepository.findOneBy({ id });

    if (!reqId) {
      throw new NotFoundException('Статья не найдена');
    }
    return 'reqId';
  }

  async update(id: number, dto: UpdateCommentDto) {
    const reqId = await this.commentRepository.findOneBy({ id });

    if (!reqId) {
      throw new NotFoundException('Статья не найдена');
    }

    return this.commentRepository.update(id, dto);
  }

  async remove(id: number) {
    const reqId = await this.commentRepository.findOneBy({ id });

    if (!reqId) {
      throw new NotFoundException('Комментарий не найден');
    }
    return this.commentRepository.delete(id);
  }
}
