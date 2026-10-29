/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckSquare } from 'lucide-react';

interface TaskHeaderProps {
  /** Quantidade total de tarefas cadastradas */
  totalTasks: number;
  /** Quantidade de tarefas que ainda faltam concluir */
  pendingTasks: number;
}

/**
 * Componente TaskHeader
 * 
 * Exibe o topo visual da aplicação com o nome do projeto, ícone representativo,
 * a data atual formatada de forma amigável e um resumo rápido das pendências.
 */
export const TaskHeader: React.FC<TaskHeaderProps> = ({ totalTasks, pendingTasks }) => {
  // Formata a data atual em português (Ex: "quinta-feira, 29 de outubro")
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  // Deixa a primeira letra da data em maiúsculo
  const capitalizedDate = todayFormatted.charAt(0).toUpperCase() + todayFormatted.slice(1);

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-600 text-white shadow-sm">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Minhas Tarefas
            </h1>
            <p className="text-xs font-medium text-slate-500">
              {capitalizedDate}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-medium text-slate-500 block">
            Pendências
          </span>
          <span className="text-lg font-bold text-slate-800 tabular-nums">
            {pendingTasks} {pendingTasks === 1 ? 'tarefa' : 'tarefas'}
          </span>
        </div>
      </div>
    </header>
  );
};
