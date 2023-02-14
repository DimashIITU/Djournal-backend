import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntitly } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntitly])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
