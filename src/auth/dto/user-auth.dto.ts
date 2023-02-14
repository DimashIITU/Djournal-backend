import { IsEmail, Length } from 'class-validator';

export class UserAuthDto {
  @IsEmail(undefined, { message: 'Неверный формат почты' })
  email: string;

  @Length(6, 32, { message: 'Password must be minimum 6 characters' })
  password: string;
}
