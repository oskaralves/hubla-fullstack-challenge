import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { ResponseHelper } from '../../common/helper/response.helper';
import { SearchHelper } from '../../common/helper/search.helper';
import { SortHelper } from '../../common/helper/sort.helper';
import { PrismaService } from '../../prisma/prisma.service';
import { PagedUsersResponseDto } from '../dto/paged-users-response.dto';
import { UserDto } from '../dto/user.dto';
import { UsersQueryParamsDto } from '../dto/users-query-params.dto';

@Injectable()
export class FindManyPagedUsersUseCase {
  private readonly fieldsToSearch: Prisma.UserScalarFieldEnum[] = [
    'name',
    'nickname',
    'username',
    'email',
  ];

  constructor(private readonly prismaService: PrismaService) {}

  public async execute({
    search = '',
    roles = [],
    skip = 0,
    take = 10,
    sort = 'createdAt:desc',
    path = '/users',
  }: UsersQueryParamsDto): Promise<PagedUsersResponseDto> {
    const where = {
      ...SearchHelper.searchBuilder({ search, fields: this.fieldsToSearch }),
      ...(roles.length > 0 && { type: { in: roles } }),
    };

    const orderBy =
      SortHelper.parseSortParam<Prisma.UserOrderByWithAggregationInput>(sort, [
        ...this.fieldsToSearch,
        'createdAt',
      ]);

    const [rows, totalRows] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        include: { roles: true },
        skip,
        take,
        orderBy,
      }),
      this.prismaService.user.count({ where }),
    ]);

    return ResponseHelper.pagedResponse<UserDto>({
      path,
      search,
      skip,
      take,
      sort,
      rows: rows.map((item) => plainToClass(UserDto, item)),
      totalRows,
    });
  }
}
