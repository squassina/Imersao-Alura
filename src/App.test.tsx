import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.tsx';

describe('Integração da Aplicação Minhas Tarefas (App)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve carregar a aplicação com o título, cabeçalho e tarefas iniciais', () => {
    render(<App />);

    expect(screen.getByText('Minhas Tarefas')).toBeInTheDocument();
    expect(
      screen.getByText('Aprender como o useState gerencia estados no React')
    ).toBeInTheDocument();
  });

  it('deve adicionar uma nova tarefa à lista com sucesso', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('O que você precisa fazer hoje?');
    const button = screen.getByRole('button', { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: 'Minha tarefa de teste automatizada' } });
    fireEvent.click(button);

    // A nova tarefa deve aparecer na tela
    expect(screen.getByText('Minha tarefa de teste automatizada')).toBeInTheDocument();

    // Deve ser salva no localStorage
    const savedData = JSON.parse(localStorage.getItem('minhas_tarefas_lista_v1') || '[]');
    expect(savedData.some((t: { title: string }) => t.title === 'Minha tarefa de teste automatizada')).toBe(true);
  });

  it('deve alternar o status de conclusão de uma tarefa ao clicar no checkbox', () => {
    render(<App />);

    // Tarefa 2 inicial é pendente: 'Praticar divisão de componentes em arquivos separados'
    const taskTitle = screen.getByText('Praticar divisão de componentes em arquivos separados');
    expect(taskTitle).not.toHaveClass('line-through');

    // Clica no título para marcar como concluída
    fireEvent.click(taskTitle);

    // Agora deve estar riscada
    expect(taskTitle).toHaveClass('line-through');

    // Ao clicar novamente, volta a ser pendente
    fireEvent.click(taskTitle);
    expect(taskTitle).not.toHaveClass('line-through');
  });

  it('deve excluir uma tarefa ao clicar no botão de lixeira', () => {
    render(<App />);

    const taskText = 'Explorar a sincronização com o LocalStorage';
    expect(screen.getByText(taskText)).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', {
      name: new RegExp(`Excluir tarefa "${taskText}"`, 'i'),
    });
    fireEvent.click(deleteBtn);

    // Não deve mais estar na tela
    expect(screen.queryByText(taskText)).not.toBeInTheDocument();
  });

  it('deve filtrar as tarefas entre Todas, Pendentes e Concluídas', () => {
    render(<App />);

    // Filtra por "Pendentes"
    const pendentesBtn = screen.getByRole('button', { name: /Pendentes/i });
    fireEvent.click(pendentesBtn);

    // A tarefa 1 (concluída) não deve aparecer
    expect(
      screen.queryByText('Aprender como o useState gerencia estados no React')
    ).not.toBeInTheDocument();

    // A tarefa 2 (pendente) deve continuar visível
    expect(
      screen.getByText('Praticar divisão de componentes em arquivos separados')
    ).toBeInTheDocument();

    // Filtra por "Concluídas"
    const concluidasBtn = screen.getByRole('button', { name: /^Concluídas/i });
    fireEvent.click(concluidasBtn);

    // A tarefa 1 (concluída) deve aparecer
    expect(
      screen.getByText('Aprender como o useState gerencia estados no React')
    ).toBeInTheDocument();

    // A tarefa 2 (pendente) não deve aparecer
    expect(
      screen.queryByText('Praticar divisão de componentes em arquivos separados')
    ).not.toBeInTheDocument();
  });

  it('deve limpar todas as tarefas concluídas ao clicar em "Limpar concluídas"', () => {
    render(<App />);

    const clearBtn = screen.getByRole('button', { name: /Limpar concluídas/i });
    fireEvent.click(clearBtn);

    // A tarefa 1 (concluída) não deve mais existir
    expect(
      screen.queryByText('Aprender como o useState gerencia estados no React')
    ).not.toBeInTheDocument();
  });

  it('deve permitir abrir e fechar o guia didático de aprendizado', () => {
    render(<App />);

    const guideToggle = screen.getByRole('button', {
      name: /Guia de Aprendizado: Como este código foi organizado/i,
    });

    // Inicialmente fechado
    expect(screen.queryByText(/1\. Divisão em Componentes:/i)).not.toBeInTheDocument();

    // Clica para abrir
    fireEvent.click(guideToggle);
    expect(screen.getByText(/1\. Divisão em Componentes:/i)).toBeInTheDocument();

    // Clica para fechar
    fireEvent.click(guideToggle);
    expect(screen.queryByText(/1\. Divisão em Componentes:/i)).not.toBeInTheDocument();
  });
});
