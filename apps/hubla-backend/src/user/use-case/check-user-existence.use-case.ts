import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CheckUserExistenceUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Verifica a existência de um username ou email.
   * @param username Nome de usuário opcional.
   * @param email Email opcional.
   * @param userId ID do usuário atual para desconsiderar na verificação.
   * @returns Objeto indicando disponibilidade de username e email.
   */
  async execute({
    username,
    email,
    userId,
  }: {
    username?: string;
    email?: string;
    userId?: string;
  }): Promise<{ isAvailable: boolean }> {
    if (!username && !email) {
      throw new BadRequestException('Username or email must be provided');
    }

    const [userByUsername, userByEmail] = await Promise.all([
      username
        ? this.prismaService.user.findUnique({
            where: { username },
            select: { id: true },
          })
        : null,
      email
        ? this.prismaService.user.findUnique({
            where: { email },
            select: { id: true },
          })
        : null,
    ]);

    const isUsernameAvailable = !userByUsername || userByUsername.id === userId;
    const isEmailAvailable = !userByEmail || userByEmail.id === userId;

    return { isAvailable: isUsernameAvailable && isEmailAvailable };
  }
}
