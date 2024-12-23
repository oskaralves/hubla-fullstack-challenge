import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorator/is-public.decorator';
import { AuthRequestDto } from './dto/auth-request.dto';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { EmailConfirmationDto } from './dto/email-confirmation-request.dto';
import { PasswordForgotRequestDto } from './dto/password-forgot-request.dto';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RefreshTokenGuard } from './guard/refresh-token.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('access')
  @IsPublic()
  @ApiOperation({
    summary: 'access',
    description: 'Solicita o token de acesso para acessar os recursos da API.',
  })
  @ApiOkResponse({ description: 'OK', type: SignInResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signInAsync(data);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({
    summary: 'refreshToken',
    description:
      'Solicita um novo token de acesso para acessar os recursos de API.',
  })
  @ApiHeader({
    name: 'Authorization',
    description:
      'RefreshToken de acesso JWT no formato `Bearer {refreshToken}` para renovar o `accessToken` e o `refreshToken`.',
    required: true,
  })
  @ApiOkResponse({ description: 'OK', type: SignInResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  refreshTokens(@Request() req: AuthRequestDto): Promise<SignInResponseDto> {
    const userId = req.user?.['sub'];
    const refreshToken = req.user?.['refreshToken'];
    return this.authService.refreshTokensAsync(userId, refreshToken);
  }

  @Get('signout')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'signOut',
    description: 'Remove o refreshToken.',
  })
  @ApiNoContentResponse({ description: 'OK' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut(@Request() { user: { id } }: AuthRequestDto) {
    this.authService.signOutAsync(id);
  }

  @Post('password/forgot')
  @IsPublic()
  @ApiOperation({
    summary: 'passwordForgot',
    description:
      'Solicita um novo código/link enviado para o e-mail cadastrado.',
  })
  @ApiNoContentResponse({ description: 'OK' })
  @ApiNotFoundResponse({
    description: 'Código inválido ou expirado',
    type: NotFoundException,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  passwordForgot(@Body() { email }: PasswordForgotRequestDto) {
    return this.authService.forgotPasswordAsync(email);
  }

  @IsPublic()
  @Get('password/forgot/check/:code')
  @ApiOperation({
    summary: 'passwordForgotCheckCode',
    description: 'Verifica se o código recebido digitado é válido.',
  })
  @ApiNoContentResponse({ description: 'OK' })
  @ApiNotFoundResponse({
    description: 'Código inválido ou expirado',
    type: NotFoundException,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  passwordForgotCheckCode(@Param('code') code: string) {
    return this.authService.checkCodePasswordAsync(code);
  }

  @Post('password/reset')
  @IsPublic()
  @ApiOperation({
    summary: 'passwordReset',
    description:
      'Atualiza a senha do usuário utilizando o código recebido e nova senha.',
  })
  @ApiNoContentResponse({ description: 'OK' })
  @ApiNotFoundResponse({
    description: 'Código inválido ou expirado',
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Senha não coincide',
    type: BadRequestException,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() changePasswordRequestDto: ChangePasswordRequestDto) {
    return this.authService.resetPasswordAsync(changePasswordRequestDto);
  }

  @Post('email/confirmation')
  @IsPublic()
  @ApiOperation({
    summary: 'emailConfirmation',
    description: 'Confirma que o email do usuário foi verificado.',
  })
  @ApiNoContentResponse({ description: 'OK' })
  @ApiNotFoundResponse({
    description: 'Código inválido ou expirado',
    type: NotFoundException,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  emailConfirmationCheckCode(
    @Body() emailConfirmationDto: EmailConfirmationDto,
  ) {
    return this.authService.checkCodeEmailConfirmationAsync(
      emailConfirmationDto,
    );
  }
}
