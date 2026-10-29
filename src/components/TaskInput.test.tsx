import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskInput } from './TaskInput.tsx';

describe('Componente TaskInput', () => {
  it('deve desabilitar o botão se o campo estiver vazio ou apenas com espaços', () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText('O que você precisa fazer hoje?');
    const button = screen.getByRole('button', { name: /Adicionar/i });

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: '   ' } });
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Nova tarefa válida' } });
    expect(button).not.toBeDisabled();
  });

  it('deve chamar onAddTask e limpar o campo de texto ao submeter', () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText('O que você precisa fazer hoje?');
    const button = screen.getByRole('button', { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: 'Aprender Git e GitHub' } });
    fireEvent.click(button);

    expect(onAddTask).toHaveBeenCalledTimes(1);
    expect(onAddTask).toHaveBeenCalledWith('Aprender Git e GitHub');
    expect(input).toHaveValue('');
  });

  it('deve permitir adicionar tarefa pressionando a tecla Enter', () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText('O que você precisa fazer hoje?');

    fireEvent.change(input, { target: { value: 'Revisar conceitos de componentes' } });
    fireEvent.submit(input.closest('form')!);

    expect(onAddTask).toHaveBeenCalledWith('Revisar conceitos de componentes');
    expect(input).toHaveValue('');
  });
});
