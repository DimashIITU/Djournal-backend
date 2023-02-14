import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { query } from 'express';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @User() userId: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(createCommentDto, userId);
  }

  @Get()
  findAll(@Query() query: { postId: number }) {
    return this.commentService.findAll(+query.postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidationPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
