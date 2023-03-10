import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.userService.findByCond(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+req.user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req) {
    return this.userService.remove(+req.user.id);
  }

  @Get('search')
  search(@Query() search: SearchUserDto) {
    console.log('wrok');
    return this.userService.search(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
