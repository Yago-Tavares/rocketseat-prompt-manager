import { PromptRepository } from '@/core/domain/prompts/prompt.repository';
import { PrismaClient } from '@/generated/prisma/client';

export class PrismaPromptRepository implements PromptRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany() {
    return this.prisma.prompt.findMany();
  }

  async searchMany(term: string) {
    return this.prisma.prompt.findMany({
      where: {
        OR: [
          {
            title: {
              contains: term,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: term,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
