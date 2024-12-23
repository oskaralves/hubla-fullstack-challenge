import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { CacheService } from '../cache/cache.service';
import { CodeHelper } from '../common/helper/code.helper';
import { PasswordHelper } from '../common/helper/password.helper';
import { UserDto } from '../user/dto/user.dto';
import { FindUserByEmailUseCase } from '../user/use-case/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '../user/use-case/find-user-by-id.use-case';
import { FindUserByUsernameUseCase } from '../user/use-case/find-user-by-username.use-case';
import { UpdateUserUseCase } from '../user/use-case/update-user.use-case';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { EmailConfirmationDto } from './dto/email-confirmation-request.dto';
import { PasswordForgotRequestDto } from './dto/password-forgot-request.dto';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { UserPayloadDto } from './dto/user-payload.dto';

@Injectable()
export class AuthService {
  jwtAccessSecret: string;
  jwtAccessSecretExp: string;
  jwtRefreshSecret: string;
  jwtRefreshSecretExp: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByUsernameUseCase: FindUserByUsernameUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {
    this.jwtAccessSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
    this.jwtAccessSecretExp = this.configService.get<string>(
      'JWT_ACCESS_SECRET_EXP',
    );
    this.jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');
    this.jwtRefreshSecretExp = this.configService.get<string>(
      'JWT_REFRESH_SECRET_EXP',
    );
  }

  async signInAsync({ email, password }: SignInRequestDto) {
    let userFound = null;

    try {
      userFound = await this.findUserByEmailUseCase.execute(email);
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválida');
    }

    if (!userFound) {
      try {
        userFound = await this.findUserByUsernameUseCase.execute(email);
      } catch (error) {
        throw new UnauthorizedException('Credenciais inválida');
      }
    }

    if (!userFound) {
      throw new UnauthorizedException('Credenciais inválida');
    }

    const isPasswordValid = await PasswordHelper.comparePasswordsAsync({
      hash: userFound.password,
      password,
    });

    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciais inválida');

    if (!userFound.emailVerified) {
      throw new BadRequestException('Email não confirmado, valide seu e-mail');
    }

    const tokens = await this.getTokensAsync(userFound);
    const decodedToken = await this.jwtService.verifyAsync<UserPayloadDto>(
      tokens.refreshToken,
      { secret: this.configService.get<string>('JWT_REFRESH_SECRET') },
    );
    await this.updateRefreshTokenAsync(
      userFound.id,
      tokens.refreshToken,
      decodedToken.exp,
    );

    const user = await this.findUserByIdUseCase.execute(userFound.id);

    return { ...plainToClass(UserDto, user), ...tokens };
  }

  async updateRefreshTokenAsync(
    userId: string,
    refreshToken: string,
    exp: number,
  ) {
    const nowTimestamp = Number(
      new Date().getTime().toString().substring(0, 10),
    );

    const ttl = exp - nowTimestamp;
    if (ttl > 0) {
      this.cacheService.set('refresh-token', userId, { refreshToken }, { ttl });
      return refreshToken;
    }
  }

  async signOutAsync(userId: string) {
    this.cacheService.del('refresh-token', userId);
  }

  async refreshTokensAsync(
    userId: string,
    refreshToken: string,
  ): Promise<SignInResponseDto> {
    const refreshCached = await this.cacheService.get<{ refreshToken: string }>(
      'refresh-token',
      userId,
    );

    const user = await this.findUserByIdUseCase.execute(userId);

    if (!user || !refreshCached) throw new ForbiddenException('Access Denied');

    const decodedToken = await this.jwtService.verifyAsync<UserPayloadDto>(
      refreshToken,
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      },
    );

    const nowTimestamp = Number(
      new Date().getTime().toString().substring(0, 10),
    );

    if (decodedToken.exp < nowTimestamp)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokensAsync({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    await this.updateRefreshTokenAsync(
      user.id,
      tokens.refreshToken,
      decodedToken.exp,
    );
    return { ...plainToClass(UserDto, user), ...tokens };
  }

  async forgotPasswordAsync(email: string) {
    const user = await this.findUserByEmailUseCase.execute(email);
    if (!user) throw new NotFoundException('Nenhuma conta!');

    const code = CodeHelper.generateRandomNumber();
    const data = { email: user.email };

    // @todo: enviar email para resetar senha

    await this.cacheService.set('forgot-password', code, data, {
      ttl: 60 * 60 * 24 * 2, // 2 dias
    });
  }

  async checkCodePasswordAsync(
    code: string,
  ): Promise<PasswordForgotRequestDto> {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await this.cacheService.get<PasswordForgotRequestDto>(
      'forgot-password',
      code,
    );
    if (!data) {
      throw new NotFoundException('Invalid or expired code');
    }
    return data;
  }

  async checkCodeEmailConfirmationAsync({ code, email }: EmailConfirmationDto) {
    const data = await this.cacheService.get<EmailConfirmationDto>(
      'email-confirmation',
      code,
    );
    if (!data || data.email !== email) {
      throw new NotFoundException('Invalid or expired code');
    }

    const user = await this.findUserByEmailUseCase.execute(data.email);

    const userUpdated = await this.updateUserUseCase.execute(user.id, {
      emailVerified: new Date(),
    });

    if (userUpdated) {
      await this.cacheService.del('email-confirmation', code);
    }
  }

  async resetPasswordAsync({
    code,
    password,
    passwordConfirmation,
  }: ChangePasswordRequestDto) {
    const { email } = await this.checkCodePasswordAsync(code);

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Password do not match');
    }

    const user = await this.findUserByEmailUseCase.execute(email);
    if (!user) throw new NotFoundException('User not found');
    const updatedUser = await this.updateUserUseCase.execute(user.id, {
      password,
    });

    if (updatedUser) {
      return await this.cacheService.del('forgot-password', code);
    }
  }

  private async getTokensAsync(
    user: Partial<Pick<UserDto, 'id' | 'email' | 'name'>>,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.id, email: user.email, name: user.name },
        { secret: this.jwtAccessSecret, expiresIn: this.jwtAccessSecretExp },
      ),
      this.jwtService.signAsync(
        { sub: user.id, email: user.email, name: user.name },
        { secret: this.jwtRefreshSecret, expiresIn: this.jwtRefreshSecretExp },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
