/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Task, FilterType } from '../types.ts';
import { TaskItem } from './TaskItem.tsx';
import { EmptyState } from './EmptyState.tsx';

interface TaskListProps {
  tasks: Task[];
  totalTasksCount: number;
  currentFilter: FilterType;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

/**
 * Componente TaskList
 * 
 * Didática para iniciantes:
 * No React, quando renderizamos uma lista de itens usando `.map()`, é essencial
 * fornecer a propriedade `key` (neste caso, `key={task.id}`).
 * A `key` ajuda o React a identificar exatamente quais itens foram adicionados,
 * alterados ou removidos, otimizando a atualização do DOM.
 */
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  totalTasksCount,
  currentFilter,
  onToggleTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        filter={currentFilter}
        hasAnyTasks={totalTasksCount > 0}
      />
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};
