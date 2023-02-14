import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntitly } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntitly])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
