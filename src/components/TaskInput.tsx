/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  /** Função callback disparada quando o usuário confirma uma nova tarefa */
  onAddTask: (title: string) => void;
}

/**
 * Componente TaskInput
 * 
 * Didática para iniciantes:
 * Este componente gerencia seu próprio estado local (`inputValue`) para controlar
 * o que o usuário digita no campo de texto (padrão conhecido como "Controlled Component").
 * Quando o formulário é enviado (seja clicando no botão ou teclando Enter),
 * ele chama a função `onAddTask` que foi passada pelo componente pai (App).
 */
export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento padrão da página ao enviar o form

    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      return; // Não adiciona se estiver vazio ou só com espaços
    }

    onAddTask(trimmedValue);
    setInputValue(''); // Limpa o campo de texto para a próxima tarefa
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden bg-white border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="O que você precisa fazer hoje?"
          className="w-full py-3.5 pl-4 pr-32 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="absolute right-1.5 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar</span>
        </button>
      </div>
    </form>
  );
};
