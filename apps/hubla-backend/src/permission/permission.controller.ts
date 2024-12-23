import { CacheInterceptor } from '@nestjs/cache-manager';
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
import { Permissions } from '../auth/decorator/permissions.decorator';
import { Roles } from '../auth/decorator/roles.decorator';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import {
  PagedPermissionsResponseDto,
  PermissionDto,
} from './dto/permission.dto';
import { PermissionsQueryParamsDto } from './dto/permissions-query-params.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionPermissionEnum } from './enum/permission-permission.enum';
import { PermissionService } from './permission.service';

@Controller('permissions')
@UseGuards(AccessTokenGuard, RolesGuard)
@ApiTags('Permissions')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionService) {}

  @Post()
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(PermissionPermissionEnum.CREATE)
  @ApiOperation({
    summary: 'create',
    description: 'Cadastra um novo usuário',
  })
  @ApiCreatedResponse({
    type: PermissionDto,
    description: 'Created permission',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  @ApiConflictResponse({
    description: 'Name already exists',
    type: ConflictException,
  })
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionDto> {
    return this.permissionsService.createAsync(createPermissionDto);
  }

  @Get()
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(PermissionPermissionEnum.READ)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'findAll',
    description: 'Retorna a lista paginada de usuários',
  })
  @ApiOkResponse({
    description: 'List of paginated permissions',
    type: PagedPermissionsResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  findAll(
    @Query() query: PermissionsQueryParamsDto,
  ): Promise<PagedPermissionsResponseDto> {
    return this.permissionsService.findAllAsync({
      ...query,
    });
  }

  @Get(':id')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(PermissionPermissionEnum.READ)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'findOne',
    description: 'Retorna um usuário',
  })
  @ApiOkResponse({ description: 'Permission found', type: PermissionDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    description: 'Permission not found',
    type: NotFoundException,
  })
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOneAsync(id);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(PermissionPermissionEnum.UPDATE)
  @ApiOperation({
    summary: 'update',
    description: 'Atualiza um ou mais atributos de um usuário',
  })
  @ApiOkResponse({ description: 'OK', type: PermissionDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    description: 'Permission not found',
    type: NotFoundException,
  })
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.updateAsync(id, updatePermissionDto);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(PermissionPermissionEnum.DELETE)
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
    description: 'Permission not found',
    type: NotFoundException,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.permissionsService.removeAsync(id);
  }
}
