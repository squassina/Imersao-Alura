import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './TaskItem.tsx';
import { Task } from '../types.ts';

describe('Componente TaskItem', () => {
  const pendingTask: Task = {
    id: 'test-1',
    title: 'Estudar testes unitários no React',
    completed: false,
    createdAt: Date.now(),
  };

  const completedTask: Task = {
    id: 'test-2',
    title: 'Comprar café',
    completed: true,
    createdAt: Date.now(),
  };

  it('deve renderizar a tarefa pendente com seus elementos e estilos corretos', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskItem task={pendingTask} onToggle={onToggle} onDelete={onDelete} />
    );

    // O título deve estar presente na tela
    const titleElement = screen.getByText('Estudar testes unitários no React');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).not.toHaveClass('line-through');

    // Não deve exibir o rótulo "Concluída"
    expect(screen.queryByText('Concluída')).not.toBeInTheDocument();

    // Checkbox deve ter o aria-label correto para marcar como concluída
    const checkbox = screen.getByRole('button', { name: /Marcar como concluída/i });
    expect(checkbox).toBeInTheDocument();
  });

  it('deve renderizar a tarefa concluída com estilo riscado e rótulo "Concluída"', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskItem task={completedTask} onToggle={onToggle} onDelete={onDelete} />
    );

    // O título deve ter a classe line-through
    const titleElement = screen.getByText('Comprar café');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('line-through');

    // Deve exibir o rótulo visual "Concluída"
    expect(screen.getByText('Concluída')).toBeInTheDocument();

    // Checkbox deve ter o aria-label para marcar como pendente
    const checkbox = screen.getByRole('button', { name: /Marcar como pendente/i });
    expect(checkbox).toBeInTheDocument();
  });

  it('deve chamar a função onToggle com o ID correto ao clicar no checkbox ou no texto', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskItem task={pendingTask} onToggle={onToggle} onDelete={onDelete} />
    );

    const checkbox = screen.getByRole('button', { name: /Marcar como concluída/i });
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith('test-1');

    const titleElement = screen.getByText('Estudar testes unitários no React');
    fireEvent.click(titleElement);
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith('test-1');
  });

  it('deve chamar a função onDelete com o ID correto ao clicar no botão de excluir', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskItem task={pendingTask} onToggle={onToggle} onDelete={onDelete} />
    );

    const deleteButton = screen.getByRole('button', {
      name: /Excluir tarefa "Estudar testes unitários no React"/i,
    });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('test-1');
  });
});
