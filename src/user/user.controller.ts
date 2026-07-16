import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SkipAuth } from 'decorators/public.decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('store')
  @SkipAuth()
  store(@Body() createUserDto: CreateUserDto) {
    return this.userService.store(createUserDto);
  }

  @Post('signin')
  @SkipAuth()
  sign(@Body() signInDto: SignInDto) {
    return this.userService.sign(signInDto);
  }
}
