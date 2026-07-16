import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    store(createUserDto: CreateUserDto): Promise<{
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    sign(signInDto: SignInDto): Promise<{
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
