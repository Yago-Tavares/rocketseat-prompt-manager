import { PrismaPromptRepository } from '@/app/infra/repository/prisma-promt.repository';
import { Prompt } from '@/core/domain/prompts/prompt.entity';
import { PrismaClient } from '@/generated/prisma/client';

describe('PrismaPromptRepository', () => {
  const prompts: Prompt[] = [
    {
      id: '1',
      title: 'Primeiro prompt',
      content: 'Conteudo do primeiro prompt',
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
      updatedAt: new Date('2026-04-01T10:00:00.000Z'),
    },
    {
      id: '2',
      title: 'Segundo prompt',
      content: 'Conteudo do segundo prompt',
      createdAt: new Date('2026-04-02T10:00:00.000Z'),
      updatedAt: new Date('2026-04-02T10:00:00.000Z'),
    },
  ];

  const findManyMock = jest.fn();

  const makeSut = () => {
    const prisma = {
      prompt: {
        findMany: findManyMock,
      },
    } as unknown as PrismaClient;

    return new PrismaPromptRepository(prisma);
  };

  beforeEach(() => {
    findManyMock.mockReset();
  });

  it('deve listar todos os prompts usando o Prisma', async () => {
    findManyMock.mockResolvedValue(prompts);
    const repository = makeSut();

    const result = await repository.findMany();

    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(findManyMock).toHaveBeenCalledWith();
    expect(result).toEqual(prompts);
  });

  it('deve buscar prompts por titulo ou conteudo de forma case-insensitive e ordenar pelos mais recentes', async () => {
    findManyMock.mockResolvedValue(prompts);
    const repository = makeSut();
    const term = 'prompt';

    const result = await repository.searchMany(term);

    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(findManyMock).toHaveBeenCalledWith({
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
    expect(result).toEqual(prompts);
  });
});
