import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private UserService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const user = await this.UserService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Этого пользователья не существует');
    }
    return { userId: payload.sub, email: payload.email };
  }
}
