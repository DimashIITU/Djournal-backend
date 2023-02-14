import { IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @Length(5)
  text: string;

  @IsNotEmpty()
  postId: number;
}
