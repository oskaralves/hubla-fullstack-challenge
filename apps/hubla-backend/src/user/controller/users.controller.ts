import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRoleEnum } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../../auth/decorator/permissions.decorator';
import { Roles } from '../../auth/decorator/roles.decorator';
import { AccessTokenGuard } from '../../auth/guard/access-token.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { PagedUsersResponseDto } from '../dto/paged-users-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UsersQueryParamsDto } from '../dto/users-query-params.dto';
import { UserPermissionEnum } from '../enum/user-permission.enum';
import { CheckUserExistenceUseCase } from '../use-case/check-user-existence.use-case';
import { CreateUserUseCase } from '../use-case/create-user.use-case';
import { FindManyPagedUsersUseCase } from '../use-case/find-many-paged-users.use-case';
import { FindUserByIdUseCase } from '../use-case/find-user-by-id.use-case';
import { RemoveUserUseCase } from '../use-case/remove-user.use-case';
import { UpdateUserUseCase } from '../use-case/update-user.use-case';

@Controller('users')
@UseGuards(AccessTokenGuard, RolesGuard)
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly checkUserExistenceUseCase: CheckUserExistenceUseCase,
    private readonly findManyUsersUseCase: FindManyPagedUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
  ) {}

  @Post()
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(UserPermissionEnum.CREATE)
  @ApiOperation({
    summary: 'create',
    description: 'Cadastra um novo usuário',
  })
  @ApiCreatedResponse({ type: UserDto, description: 'Created user' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    description: 'Role not found',
    type: NotFoundException,
  })
  @ApiConflictResponse({
    description: 'Email already exists',
    type: ConflictException,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const created = await this.createUserUseCase.execute(createUserDto);
    return plainToClass(UserDto, created);
  }

  @Get()
  @CacheTTL(1)
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(UserPermissionEnum.READ)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'findAll',
    description: 'Retorna a lista paginada de usuários',
  })
  @ApiOkResponse({
    description: 'List of paginated users',
    type: PagedUsersResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  async findAll(
    @Query() queryParams: UsersQueryParamsDto,
  ): Promise<PagedUsersResponseDto> {
    return this.findManyUsersUseCase.execute(queryParams);
  }

  @Get('check')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(UserPermissionEnum.READ)
  @ApiOperation({
    summary: 'checkExistence',
    description: 'Verifica se o username ou email já existe no sistema',
  })
  @ApiOkResponse({
    description: 'Availability status',
    schema: {
      type: 'object',
      properties: {
        isAvailable: { type: 'boolean' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  async checkExistence(
    @Query('username') username?: string,
    @Query('email') email?: string,
    @Query('userId') userId?: string,
  ): Promise<{ isAvailable: boolean }> {
    return this.checkUserExistenceUseCase.execute({
      username,
      email,
      userId,
    });
  }

  @Get(':id')
  @CacheTTL(3)
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(UserPermissionEnum.READ)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'findOne',
    description: 'Retorna um usuário',
  })
  @ApiOkResponse({ description: 'User found', type: UserDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: NotFoundException,
  })
  async findOne(@Param('id') userId: string): Promise<UserDto> {
    const user = await this.findUserByIdUseCase.execute(userId);
    return plainToClass(UserDto, user);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(UserPermissionEnum.UPDATE)
  @ApiOperation({
    summary: 'update',
    description: 'Atualiza um ou mais atributos de um usuário',
  })
  @ApiOkResponse({ description: 'OK', type: UserDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: NotFoundException,
  })
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updated = await this.updateUserUseCase.execute(userId, updateUserDto);
    return plainToClass(UserDto, updated);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(UserPermissionEnum.DELETE)
  @ApiOperation({
    summary: 'remove',
    description: 'Remove um usuário',
  })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: NotFoundException,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') userId: string) {
    return this.removeUserUseCase.execute(userId);
  }
}
