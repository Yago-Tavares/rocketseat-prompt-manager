'use server';

import { PromptSummary } from '@/core/domain/prompts/prompt.entity';
import { PrismaPromptRepository } from '../infra/repository/prisma-promt.repository';
import { SearchPromptsUseCase } from '@/core/application/prompts/search-prompts.use-case';
import { prisma } from '@/lib/prisma';

type SearchFormState = {
  success: boolean;
  prompts?: PromptSummary[];
  message?: string;
};

export async function searchPromptAction(
  _prev: SearchFormState,
  formData: FormData
): Promise<SearchFormState> {
  const term = String(formData.get('q') ?? '').trim();

  const repository = new PrismaPromptRepository(prisma);
  const useCase = new SearchPromptsUseCase(repository);

  try {
    const prompts = await useCase.execute(term);

    const promptsSummary = prompts.map((prompt) => ({
      id: prompt.id,
      title: prompt.title,
      content: prompt.content,
    }));

    return {
      success: true,
      prompts: promptsSummary,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao buscar prompts!',
    };
  }
}
