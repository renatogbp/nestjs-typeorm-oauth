import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from './../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
          secretOrPrivateKey: configService.getJwtSecret(),
          signOptions: {
              expiresIn: configService.getExpiresIn(),
          },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
