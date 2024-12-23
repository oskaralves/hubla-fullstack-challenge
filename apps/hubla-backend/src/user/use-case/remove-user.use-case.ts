import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from '../dto/user.dto';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';

@Injectable()
export class RemoveUserUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findUserUseCase: FindUserByIdUseCase,
  ) {}

  async execute(id: string): Promise<UserDto> {
    const user = await this.findUserUseCase.execute(id);

    await this.prismaService.user.delete({ where: { id } });

    return plainToClass(UserDto, user);
  }
}
