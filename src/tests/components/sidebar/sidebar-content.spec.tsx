import { render, screen } from '@testing-library/react';
import { SidebarContent } from '@/components/sidebar/sidebar-content';
import userEvent from '@testing-library/user-event';

const pushTest = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushTest,
  }),
}));

const makeSut = () => {
  return render(<SidebarContent />);
};

describe('SidebarContent', () => {
  const user = userEvent.setup();
  it('should render the sidebar content', () => {
    makeSut();

    expect(screen.getByRole('complementary')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Novo prompt' })).toBeVisible();
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
  });

  describe('Novo prompt', () => {
    it('deveria navegar para a página de novo prompt ao clicar no botão de novo prompt', async () => {
      makeSut();

      const newPromptButton = screen.getByRole('button', {
        name: /novo prompt/i,
      });

      await user.click(newPromptButton);

      expect(pushTest).toHaveBeenCalledWith('/new');
    });
  });
});
