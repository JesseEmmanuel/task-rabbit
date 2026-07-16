import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) {}

  async store(createUserDto: CreateUserDto) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async sign(credentials: SignInDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let { password, ...userData } = user
    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    })

    return { access_token: accessToken, user: userData };
  }
}
