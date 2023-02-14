import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthDto } from 'src/auth/dto/user-auth.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntitly } from './entities/user.entity';
import { CommentEntitly } from 'src/comment/entities/comment.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntitly)
    private usersRepository: Repository<UserEntitly>,
  ) {}

  create(reqCreate: CreateUserDto) {
    return this.usersRepository.save(reqCreate);
  }

  async findAll() {
    const arr = await this.usersRepository
      .createQueryBuilder('u')
      .leftJoinAndMapMany(
        'u.comments',
        CommentEntitly,
        'comment',
        'comment.userId = u.id',
      )
      .loadRelationCountAndMap('u.commentsCount', 'u.comments', 'comments')
      .getMany();
    return arr.map((item) => {
      delete item.comments;
      return item;
    });
  }
  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
  async findByCond(cond: UserAuthDto) {
    return await this.usersRepository.findOneBy(cond);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
  async search(param: SearchUserDto) {
    const qb = this.usersRepository.createQueryBuilder('u');
    if (param.email) {
      qb.where('u.email ILIKE :email');
    }
    if (param.fullName) {
      qb.where('u.fullName ILIKE :fullName');
    }

    qb.setParameters({
      email: `%${param.email}%`,
      fullName: `%${param.fullName}%`,
    });

    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
