/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FilterType } from '../types.ts';
import { ClipboardList, CheckCircle2, ListTodo } from 'lucide-react';

interface EmptyStateProps {
  filter: FilterType;
  hasAnyTasks: boolean;
}

/**
 * Componente EmptyState
 * 
 * Exibe uma mensagem acolhedora e contextualizada quando não há tarefas
 * para serem mostradas no filtro selecionado.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ filter, hasAnyTasks }) => {
  if (!hasAnyTasks) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-dashed border-slate-300 rounded-xl">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-3">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">
          Nenhuma tarefa cadastrada
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Digite uma atividade no campo acima e clique em &quot;Adicionar&quot; para organizar seu dia.
        </p>
      </div>
    );
  }

  if (filter === 'active') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-dashed border-slate-300 rounded-xl">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">
          Tudo em dia!
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Parabéns! Você não tem nenhuma tarefa pendente neste momento.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-dashed border-slate-300 rounded-xl">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 mb-3">
        <ListTodo className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800">
        Nenhuma tarefa concluída ainda
      </h3>
      <p className="text-xs text-slate-500 mt-1 max-w-xs">
        Conforme você for completando suas tarefas, marque o checkbox para vê-las aqui.
      </p>
    </div>
  );
};
