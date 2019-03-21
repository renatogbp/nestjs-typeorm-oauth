import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto as CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcryptjs';
import { LoginRequest } from './dtos/login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';
import { CreateOAuthUserDto } from './dtos/create-oauth-user.dto';
import { OAuthLogin } from './entities/oauth-login';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
        private readonly jwtService: JwtService,
        private readonly configSergice: ConfigService) {}

    async register(createUserDto: CreateUserDto) {
        const user = this.userRepository.create({ username: createUserDto.username.trim().toLowerCase() });
        user.password = await hash(createUserDto.password, 12);
        await this.userRepository.save(user);
    }

    async registerOAuthUser(oAuthUser: CreateOAuthUserDto): Promise<User> {
        const user = new User({ oAuthLogins: [
            new OAuthLogin({ provider: oAuthUser.provider, providerId: oAuthUser.providerId }),
        ]});
        await this.userRepository.save(user);
        return user;
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const user = await this.userRepository.findOne({username: loginRequest.username});

        if (user && await compare(loginRequest.password, user.password)) {
            const payload: JwtPayload = { sub: user.id.toString() };
            return new LoginResponse({
                accessToken:  this.jwtService.sign(payload),
                expiresIn: this.configSergice.getExpiresIn(),
            });
        }

        throw new UnauthorizedException();
    }

    async findOne(expression: any): Promise<User> {
        return await this.userRepository.findOne({ where: expression });
    }
}
