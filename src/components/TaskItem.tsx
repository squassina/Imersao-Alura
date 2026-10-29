/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Task } from '../types.ts';
import { Check, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Componente TaskItem
 * 
 * Didática para iniciantes:
 * Este componente recebe uma tarefa individual como "prop" e exibe suas informações.
 * Quando o usuário clica no checkbox ou no botão de lixeira, ele não altera a lista diretamente:
 * ele apenas chama as funções recebidas do pai (`onToggle` e `onDelete`), passando o `task.id`.
 * Isso mantém o fluxo de dados unidirecional e previsível no React!
 */
export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  // Formata o horário em que a tarefa foi criada
  const timeFormatted = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(task.createdAt));

  return (
    <div
      className={`group flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
        task.completed
          ? 'bg-slate-50/70 border-slate-200/70 opacity-75 hover:opacity-100'
          : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Botão de Checkbox Customizado */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
          title={task.completed ? 'Clique para marcar como pendente' : 'Clique para marcar como concluída'}
          className={`flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-150 shrink-0 ${
            task.completed
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
              : 'border-slate-300 hover:border-indigo-600 hover:bg-indigo-50/50 bg-white'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Informações da Tarefa */}
        <div className="min-w-0 flex-1">
          <p
            onClick={() => onToggle(task.id)}
            className={`text-sm cursor-pointer select-none transition-all break-words ${
              task.completed
                ? 'line-through decoration-slate-400/80 text-slate-400 italic'
                : 'text-slate-800 hover:text-slate-900 font-medium'
            }`}
          >
            {task.title}
          </p>
          
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-slate-400 tabular-nums">
              Criada às {timeFormatted}
            </span>
            {task.completed && (
              <>
                <span className="text-slate-300 text-[10px]" aria-hidden="true">·</span>
                <span className="text-[11px] font-medium text-emerald-600">
                  Concluída
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Botão de Excluir */}
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Excluir tarefa "${task.title}"`}
        title="Excluir tarefa"
        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
