import { PartialType } from '@nestjs/mapped-types';
import { Length } from 'class-validator';
import { CreatePostDto, OutputData } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @Length(3)
  title?: string;

  body?: OutputData['blocks'];

  tags?: string;
}
