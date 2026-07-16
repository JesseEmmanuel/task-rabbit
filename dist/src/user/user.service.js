"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const database_service_1 = require("../database/database.service");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async store(createUserDto) {
        const existingUser = await this.databaseService.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.databaseService.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
    }
    async sign(credentials) {
        const user = await this.databaseService.user.findUnique({
            where: { email: credentials.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        let { password, ...userData } = user;
        const accessToken = this.jwtService.sign({
            id: user.id,
            email: user.email,
        });
        return { access_token: accessToken, user: userData };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map