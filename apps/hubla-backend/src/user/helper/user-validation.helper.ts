import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserValidationHelper {
  constructor(private readonly prismaService: PrismaService) {}

  async validateEmailAvailability(
    email?: string,
    userId?: string,
  ): Promise<void> {
    if (!email) return;
    const emailExists = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailExists && emailExists.id !== userId) {
      throw new ConflictException(`This email "${email}" is already in use.`);
    }
  }

  async validateUsernameAvailability(
    username?: string,
    userId?: string,
  ): Promise<void> {
    if (!username) return;
    const usernameExists = await this.prismaService.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (usernameExists && usernameExists.id !== userId) {
      throw new ConflictException(
        `This username "${username}" is already in use.`,
      );
    }
  }

  async validateUserExistsById(id: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
  }

  async validateUserExistsByEmail(email: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
  }

  async validateUserExistsByUsername(username: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
  }
}
