import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { DatabaseService } from "../database/database.service";
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly databaseService;
    private readonly jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    store(createUserDto: CreateUserDto): Promise<{
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    sign(credentials: SignInDto): Promise<{
        access_token: string;
        user: {
            id: string;
            first_name: string;
            last_name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
