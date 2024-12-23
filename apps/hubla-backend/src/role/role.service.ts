import { Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@prisma/client';
import { ResponseHelper } from '../common/helper/response.helper';
import { RoleDto, RolesResponseDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  async execute(): Promise<RolesResponseDto> {
    const rows = [
      { role: UserRoleEnum.ADMIN },
      { role: UserRoleEnum.AFFILIATE },
      { role: UserRoleEnum.PRODUCER },
    ];
    const totalRows = rows.length;

    return ResponseHelper.listResponse<RoleDto>({
      rows,
      totalRows,
    });
  }
}
