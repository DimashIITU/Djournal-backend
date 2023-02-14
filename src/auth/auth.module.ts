import { UserAuthDto } from './dto/user-auth.dto';
import { UserEntitly } from 'src/user/entities/user.entity';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntitly]),
    PassportModule,
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
