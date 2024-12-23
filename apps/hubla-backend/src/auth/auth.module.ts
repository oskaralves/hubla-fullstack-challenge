import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../cache/cache.service';
import { PrismaService } from '../prisma/prisma.service';
import { FindUserByEmailUseCase } from '../user/use-case/find-user-by-email.use-case';
import { FindUserByUsernameUseCase } from '../user/use-case/find-user-by-username.use-case';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInValidationMiddleware } from './middleware/sign-in-validation.middleware';
import { AccessTokenStrategy } from './strategie/access-token.strategy';
import { RefreshTokenStrategy } from './strategie/refresh-token.strategy';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ConfigService,
    CacheService,
    FindUserByEmailUseCase,
    FindUserByUsernameUseCase,
    JwtService,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInValidationMiddleware).forRoutes('auth/signin');
  }
}
