import {
  Controller,
  ForbiddenException,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
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
import { UserPermissionEnum } from '../user/enum/user-permission.enum';
import { RolesResponseDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('roles')
@UseGuards(AccessTokenGuard, RolesGuard)
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.AFFILIATE, UserRoleEnum.PRODUCER)
  @Permissions(UserPermissionEnum.READ)
  @ApiOperation({
    summary: 'findAll',
    description: 'Retorna a lista paginada de funções de usuário.',
  })
  @ApiOkResponse({
    description: 'List of roles',
    type: RolesResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenException,
  })
  async findAll() {
    return this.roleService.execute();
  }
}
