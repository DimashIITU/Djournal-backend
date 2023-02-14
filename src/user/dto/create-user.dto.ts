import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2)
  fullName: string;

  @IsEmail(undefined, { message: 'Неверный формат почты' })
  email: string;

  @Length(6, 32, { message: 'Password must be minimum 6 characters' })
  password?: string;
}
