import { render, screen } from '@testing-library/react';
import {
  SidebarContent,
  SideBarProps,
} from '@/components/sidebar/sidebar-content';
import userEvent from '@testing-library/user-event';

const pushMock = jest.fn();

let mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => mockSearchParams,
}));

const promptMock = [
  {
    id: '1',
    title: 'Prompt 1',
    content: 'Content 1',
  },
];

const makeSut = (
  { prompts = promptMock }: SideBarProps = {} as SideBarProps
) => {
  return render(<SidebarContent prompts={prompts} />);
};

describe('SidebarContent', () => {
  const user = userEvent.setup();

  describe('base', () => {
    it('should render the sidebar content', () => {
      makeSut({ prompts: promptMock });

      expect(screen.getByRole('complementary')).toBeVisible();
      expect(screen.getByRole('button', { name: 'Novo prompt' })).toBeVisible();
    });

    it('Deveria renderizar lista de prompts', () => {
      const input = [
        {
          id: '1',
          title: 'Prompt 1',
          content: 'Content 1',
        },
        {
          id: '2',
          title: 'Prompt 2',
          content: 'Content 2',
        },
      ];
      makeSut({ prompts: input });

      expect(screen.getByText(input[0].title)).toBeInTheDocument();
      expect(screen.getAllByRole('paragraph')).toHaveLength(input.length);
    });

    it('Deveria atualizar o campo de busca ao digitar', async () => {
      makeSut();

      const searchInput = screen.getByPlaceholderText(/buscar por título .../i);
      await user.type(searchInput, 'Prompt 1');

      expect(searchInput).toHaveValue('Prompt 1');
    });
  });

  describe('Colapsar/expandir', () => {
    it('deveria iniciar expandida e exibir botão minimizar', () => {
      makeSut();

      const aside = screen.getAllByRole('complementary');
      expect(aside).toBeVisible;

      const colapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      expect(colapseButton).toBeVisible();

      const expandButton = screen.queryByRole('button', {
        name: /expandir sidebar/i,
      });

      console.log(expandButton);

      expect(expandButton).not.toBeInTheDocument();
    });

    it('deveria colapsar ao clicar no botão de minimizar', async () => {
      makeSut();

      const colapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      await user.click(colapseButton);

      expect(colapseButton).not.toBeVisible();

      const expandButton = screen.getByRole('button', {
        name: /expandir sidebar/i,
      });

      expect(expandButton).toBeVisible();
    });

    it('deveria aparecer o botão de novo prompt com o sidebar minimizado', async () => {
      makeSut();

      const colapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      await user.click(colapseButton);

      const newPromptButton = screen.getByRole('button', {
        name: /novo prompt/i,
      });

      expect(newPromptButton).toBeVisible();
    });

    it('não deveria mostrar lista de prompts com sidebar minimizada', async () => {
      makeSut();

      const colapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      await user.click(colapseButton);

      const promptList = screen.queryByRole('navigation', {
        name: 'Lista de prompts',
      });

      expect(promptList).not.toBeInTheDocument();
    });
  });

  describe('Novo prompt', () => {
    it('deveria navegar para a página de novo prompt ao clicar no botão de novo prompt', async () => {
      makeSut();

      const newPromptButton = screen.getByRole('button', {
        name: /novo prompt/i,
      });

      await user.click(newPromptButton);

      expect(pushMock).toHaveBeenCalledWith('/new');
    });
  });

  describe('Busca', () => {
    it('Deveria navegar com URL codificada', async () => {
      makeSut();

      const text = 'Prompt 1';

      const searchInput = screen.getByPlaceholderText(/Buscar por título .../i);
      await user.type(searchInput, text);

      expect(pushMock).toHaveBeenCalled();

      const lastCall = pushMock.mock.calls.at(-1);

      expect(lastCall?.[0]).toBe('/?q=Prompt%201');

      await user.clear(searchInput);
      const lastClearCall = pushMock.mock.calls.at(-1);
      expect(lastClearCall?.[0]).toBe('/');
    });
  });

  it('Deveria iniciar o campo de busca com o search param', () => {
    const inicialText = 'Texto';
    mockSearchParams = new URLSearchParams(`q=${inicialText}`);
    makeSut();

    const searchInput = screen.getByPlaceholderText(/Buscar por título .../i);

    expect(searchInput).toHaveValue(inicialText);
  });
});
