import { UserService } from './../user/user.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntitly } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private JwtService: JwtService,
  ) {}

  async validateUser({ email, password }): Promise<any> {
    const user = await this.UserService.findByCond({ email, password });
    if (user && user.password === password) {
      const { password, ...info } = user;
      return info;
    }
  }
  generateJwtToken(data: UserEntitly) {
    const payload = { email: data.email, sub: data.id };
    return this.JwtService.sign(payload);
  }

  async login(user: UserEntitly) {
    return {
      ...user,
      access_token: this.generateJwtToken(user),
    };
  }

  async register(user: CreateUserDto) {
    try {
      const { password, ...data } = await this.UserService.create({
        email: user.email,
        password: user.password,
        fullName: user.fullName,
      });
      return {
        ...data,
        access_token: this.generateJwtToken(data),
      };
    } catch (error) {
      if (/(email)[\s\S]+(уже существует)/.test(error.detail)) {
        console.log('work');
        throw new BadRequestException('Такой аккаунт уже существует');
      } else {
        throw new ForbiddenException('Ошибка при регистраци');
      }
    }
  }
}
