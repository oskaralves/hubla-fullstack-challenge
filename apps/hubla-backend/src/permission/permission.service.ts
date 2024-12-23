import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { plainToClass } from 'class-transformer';
import { ResponseHelper } from '../common/helper/response.helper';
import { SearchHelper } from '../common/helper/search.helper';
import { SortHelper } from '../common/helper/sort.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import {
  PagedPermissionsResponseDto,
  PermissionDto,
} from './dto/permission.dto';
import { PermissionsQueryParamsDto } from './dto/permissions-query-params.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  private readonly fieldsToSearch: Prisma.PermissionScalarFieldEnum[] = [
    'name',
    'description',
  ];

  constructor(private readonly prismaService: PrismaService) {}

  async createAsync(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionDto> {
    const permissionExists = await this.findByNameAsync(
      createPermissionDto.name,
    );
    if (permissionExists) {
      throw new ConflictException(
        `This name "${createPermissionDto.name}" already exists`,
      );
    }

    const data: Prisma.PermissionCreateInput = {
      ...createPermissionDto,
    };

    const { id } = await this.prismaService.permission.create({
      data,
    });

    return plainToClass(PermissionDto, await this.findByIdAsync(id));
  }

  async findAllAsync({
    search,
    skip = 0,
    take = 10,
    sort = 'createdAt:desc',
    path = '/permissions',
  }: PermissionsQueryParamsDto): Promise<PagedPermissionsResponseDto> {
    const where = SearchHelper.searchBuilder({
      search,
      fields: this.fieldsToSearch,
    });

    const orderBy =
      SortHelper.parseSortParam<Prisma.PermissionOrderByWithAggregationInput>(
        sort,
        [...this.fieldsToSearch, 'createdAt'],
      );

    const [rows, totalRows] = await this.prismaService.$transaction([
      this.prismaService.permission.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prismaService.permission.count({ where }),
    ]);

    return ResponseHelper.pagedResponse<PermissionDto>({
      path,
      search,
      skip,
      take,
      sort,
      rows: rows.map((item) => plainToClass(PermissionDto, item)),
      totalRows,
    });
  }

  async findOneAsync(id: string): Promise<PermissionDto> {
    const permission = await this.findByIdAsync(id);
    return plainToClass(PermissionDto, permission);
  }

  async updateAsync(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionDto> {
    await this.findByIdAsync(id);

    const data: Prisma.PermissionUpdateInput = {
      ...updatePermissionDto,
    };

    await this.prismaService.permission.update({ data, where: { id } });

    return plainToClass(PermissionDto, await this.findByIdAsync(id));
  }

  async removeAsync(id: string): Promise<PermissionDto> {
    const permission = await this.findByIdAsync(id);
    await this.prismaService.permission.delete({ where: { id } });
    return plainToClass(PermissionDto, permission);
  }

  async findByIdAsync(id: string): Promise<PermissionDto> {
    const permissionExists = await this.prismaService.permission.findUnique({
      where: { id },
      include: { rolePermissions: true },
    });

    if (!permissionExists) {
      throw new NotFoundException('permission not found');
    }

    return plainToClass(PermissionDto, permissionExists);
  }

  async findByNameAsync(name: string) {
    return await this.prismaService.permission.findUnique({ where: { name } });
  }
}
