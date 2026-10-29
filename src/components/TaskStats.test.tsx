import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskStats } from './TaskStats.tsx';

describe('Componente TaskStats', () => {
  it('deve exibir a contagem de tarefas e barra de progresso com porcentagem correta', () => {
    const onFilterChange = vi.fn();
    const onClearCompleted = vi.fn();

    render(
      <TaskStats
        totalCount={4}
        activeCount={2}
        completedCount={2}
        currentFilter="all"
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    // 2 de 4 concluídas = 50%
    expect(screen.getByText(/2 de 4 concluídas \(50%\)/i)).toBeInTheDocument();
    
    // Contadores das abas
    const todasBtn = screen.getByRole('button', { name: /Todas/i });
    expect(todasBtn).toHaveTextContent('(4)');

    const pendentesBtn = screen.getByRole('button', { name: /Pendentes/i });
    expect(pendentesBtn).toHaveTextContent('(2)');

    const concluidasBtn = screen.getByRole('button', { name: /^Concluídas/i });
    expect(concluidasBtn).toHaveTextContent('(2)');
  });

  it('deve chamar onFilterChange ao clicar nas abas de filtro', () => {
    const onFilterChange = vi.fn();
    const onClearCompleted = vi.fn();

    render(
      <TaskStats
        totalCount={5}
        activeCount={3}
        completedCount={2}
        currentFilter="all"
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    const pendentesBtn = screen.getByRole('button', { name: /Pendentes/i });
    fireEvent.click(pendentesBtn);
    expect(onFilterChange).toHaveBeenCalledWith('active');

    const concluidasBtn = screen.getByRole('button', { name: /^Concluídas/i });
    fireEvent.click(concluidasBtn);
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });

  it('deve exibir e permitir clicar no botão "Limpar concluídas" quando houver tarefas concluídas', () => {
    const onFilterChange = vi.fn();
    const onClearCompleted = vi.fn();

    const { rerender } = render(
      <TaskStats
        totalCount={3}
        activeCount={3}
        completedCount={0}
        currentFilter="all"
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    // Quando não há concluídas (completedCount === 0), o botão não deve existir
    expect(screen.queryByText(/Limpar concluídas/i)).not.toBeInTheDocument();

    // Rerender com concluídas > 0
    rerender(
      <TaskStats
        totalCount={3}
        activeCount={2}
        completedCount={1}
        currentFilter="all"
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    const clearButton = screen.getByRole('button', { name: /Limpar concluídas/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(onClearCompleted).toHaveBeenCalledTimes(1);
  });
});
