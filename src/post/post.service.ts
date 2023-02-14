import { SearchPostDto } from './dto/search-post.dto';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntitly } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntitly)
    private postRepository: Repository<PostEntitly>,
  ) {}

  create(dto: CreatePostDto, userId: number) {
    const firstParagraph = dto.body.find((obj) => obj.type === 'paragraph')
      ?.data.text;

    return this.postRepository.save({
      title: dto.title,
      body: dto.body,
      tags: dto.tags,
      description: firstParagraph || '',
      user: { id: userId },
    });
  }

  findAll() {
    return this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async search(dto: SearchPostDto) {
    const qb = this.postRepository.createQueryBuilder('p');

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    qb.orderBy('views', dto.views);

    if (dto.title) {
      qb.where(`p.title ILIKE :title`);
    }
    if (dto.body) {
      qb.andWhere(`p.body ILIKE :body`);
    }
    if (dto.tag) {
      qb.andWhere(`p.tags ILIKE :tag`);
    }

    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: dto.views || '',
    });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async popular() {
    const qb = this.postRepository.createQueryBuilder();
    qb.orderBy('views', 'DESC');
    qb.limit(10);

    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  async findOne(id: number, userId: number) {
    await this.postRepository
      .createQueryBuilder('posts')
      .whereInIds(id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();

    const reqId = await this.postRepository.findOneBy({ id });

    if (!reqId) {
      throw new NotFoundException('Статья не найдена');
    }
    return reqId;
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const reqId = await this.postRepository.findOneBy({ id });

    const firstParagraph = dto.body.find((obj) => obj.type === 'paragraph')
      ?.data.text;

    if (!reqId) {
      throw new NotFoundException('Статья не найдена');
    }

    if (!(reqId.user.id === userId)) {
      throw new ForbiddenException('Нет доступа');
    }

    return this.postRepository.update(id, {
      title: dto.title,
      body: dto.body,
      tags: dto.tags,
      description: firstParagraph || '',
      user: { id: userId },
    });
  }

  async remove(id: number, userId: number) {
    const reqId = await this.postRepository.findOneBy({ id });

    if (!reqId) {
      throw new NotFoundException('Статья не найдена');
    }
    if (!(reqId.user.id === userId)) {
      throw new ForbiddenException('Нет доступа');
    }

    return this.postRepository.delete(id);
  }
}
