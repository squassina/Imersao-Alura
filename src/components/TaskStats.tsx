/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FilterType } from '../types.ts';
import { Trash } from 'lucide-react';

interface TaskStatsProps {
  totalCount: number;
  activeCount: number;
  completedCount: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

/**
 * Componente TaskStats
 * 
 * Exibe:
 * 1. Barra de progresso com a porcentagem de conclusão
 * 2. Abas de filtro ("Todas", "Pendentes", "Concluídas") com contadores
 * 3. Ação rápida de limpar tarefas concluídas (quando houver ao menos uma)
 */
export const TaskStats: React.FC<TaskStatsProps> = ({
  totalCount,
  activeCount,
  completedCount,
  currentFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  // Evita divisão por zero calculando a porcentagem de forma segura
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-4 mb-6">
      {/* Barra de Progresso */}
      {totalCount > 0 && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
            <span>Progresso Geral</span>
            <span className="tabular-nums font-semibold text-slate-900">
              {completedCount} de {totalCount} concluídas ({percentage}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* Controles de Filtro e Ações */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Abas de filtro estilo segmented control */}
        <div className="inline-flex p-1 bg-slate-200/70 rounded-xl">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              currentFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Todas</span>
            <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
              ({totalCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange('active')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              currentFilter === 'active'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Pendentes</span>
            <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
              ({activeCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange('completed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              currentFilter === 'completed'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Concluídas</span>
            <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
              ({completedCount})
            </span>
          </button>
        </div>

        {/* Botão para limpar concluídas, se houver alguma */}
        {completedCount > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="inline-flex items-center justify-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <Trash className="w-3.5 h-3.5" />
            <span>Limpar concluídas</span>
          </button>
        )}
      </div>
    </div>
  );
};
