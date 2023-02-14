import { UserEntitly } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @User() userId: number,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ) {
    console.log(userId);
    return this.postService.create(createPostDto, userId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('/popular')
  popular() {
    return this.postService.popular();
  }

  @Get('/search')
  searchPosts(@Query() search: SearchPostDto) {
    return this.postService.search(search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@User() userId: number, @Param('id') id: string) {
    return this.postService.findOne(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @User() userId: number,
    @Param('id') id: string,
    @Body(ValidationPipe) UpdatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(+id, UpdatePostDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@User() userId: number, @Param('id') id: string) {
    return this.postService.remove(+id, userId);
  }
}
