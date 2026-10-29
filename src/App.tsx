/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Task, FilterType } from './types.ts';
import { TaskHeader } from './components/TaskHeader.tsx';
import { TaskInput } from './components/TaskInput.tsx';
import { TaskStats } from './components/TaskStats.tsx';
import { TaskList } from './components/TaskList.tsx';
import { BookOpen, ChevronDown, ChevronUp, Code2, Database, Layers } from 'lucide-react';

const STORAGE_KEY = 'minhas_tarefas_lista_v1';

// Tarefas de exemplo iniciais para novos usuários
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Aprender como o useState gerencia estados no React',
    completed: true,
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    title: 'Praticar divisão de componentes em arquivos separados',
    completed: false,
    createdAt: Date.now() - 1800000,
  },
  {
    id: '3',
    title: 'Explorar a sincronização com o LocalStorage',
    completed: false,
    createdAt: Date.now(),
  },
];

export default function App() {
  /**
   * Estado 1: Lista de Tarefas (tasks)
   * 
   * Didática para iniciantes:
   * Passamos uma função para o useState (`lazy initial state`).
   * Ela roda apenas uma vez quando o componente é montado pela primeira vez,
   * lendo os dados salvos no LocalStorage do navegador.
   */
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Erro ao ler tarefas do LocalStorage:', err);
    }
    return INITIAL_TASKS;
  });

  /**
   * Estado 2: Filtro Atual ('all' | 'active' | 'completed')
   */
  const [filter, setFilter] = useState<FilterType>('all');

  /**
   * Estado 3: Controle de exibição do Guia Didático
   */
  const [showLearningGuide, setShowLearningGuide] = useState(false);

  /**
   * Efeito: Salvar no LocalStorage sempre que `tasks` mudar
   * 
   * Didática para iniciantes:
   * O `useEffect` monitora a variável `tasks` informada no array de dependências `[tasks]`.
   * Toda vez que uma tarefa for adicionada, marcada ou excluída, o React executa
   * esse bloco automaticamente, salvando a versão mais recente no navegador.
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Erro ao salvar tarefas no LocalStorage:', err);
    }
  }, [tasks]);

  /**
   * Função para Adicionar Tarefa
   * 
   * Didática para iniciantes:
   * No React, nunca alteramos o array original diretamente (ex: tasks.push(novaTarefa)).
   * Em vez disso, criamos um novo array com o operador spread: `[newTask, ...tasks]`.
   * Isso avisa o React que os dados mudaram e a tela deve ser re-renderizada.
   */
  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  /**
   * Função para Alternar Conclusão (Toggle)
   * 
   * Percorremos a lista com `.map()`. Quando encontramos o item com o ID correto,
   * retornamos uma cópia dele com o valor de `completed` invertido (`!task.completed`).
   */
  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Função para Excluir uma Tarefa
   * 
   * Usamos `.filter()` para manter apenas as tarefas cujo ID seja diferente do ID excluído.
   */
  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  /**
   * Função para Limpar Todas as Tarefas Concluídas
   */
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Contagens calculadas dinamicamente
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  // Filtragem da lista para exibição
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Cartão Principal da Aplicação */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-6">
          {/* Cabeçalho */}
          <TaskHeader totalTasks={totalCount} pendingTasks={activeCount} />

          {/* Campo de Entrada de Nova Tarefa */}
          <TaskInput onAddTask={handleAddTask} />

          {/* Estatísticas, Barra de Progresso e Filtros */}
          <TaskStats
            totalCount={totalCount}
            activeCount={activeCount}
            completedCount={completedCount}
            currentFilter={filter}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
          />

          {/* Lista de Tarefas Renderizada */}
          <TaskList
            tasks={filteredTasks}
            totalTasksCount={totalCount}
            currentFilter={filter}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        {/* Seção Educativa de Apoio ao Aprendizado */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all">
          <button
            type="button"
            onClick={() => setShowLearningGuide((prev) => !prev)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-semibold text-slate-800">
                Guia de Aprendizado: Como este código foi organizado
              </span>
            </div>
            {showLearningGuide ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showLearningGuide && (
            <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/60 text-xs text-slate-600 space-y-3">
              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 font-semibold block">
                    1. Divisão em Componentes:
                  </strong>
                  Cada parte da tela tem um papel único: <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-800">TaskHeader</code> (topo), <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-800">TaskInput</code> (digitação), <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-800">TaskStats</code> (progresso/filtros) e <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-800">TaskItem</code> (cada atividade).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Code2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 font-semibold block">
                    2. Estado Centralizado (useState):
                  </strong>
                  A lista de tarefas fica no componente pai (<code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-800">App.tsx</code>). Os componentes filhos apenas recebem os dados e chamam funções quando o usuário clica em algo.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Database className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 font-semibold block">
                    3. Persistência Local (localStorage):
                  </strong>
                  Usamos o <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-800">useEffect</code> para sincronizar automaticamente a lista com a memória do navegador, mantendo seus dados salvos sem precisar de banco de dados externo ou login.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé sutil */}
        <footer className="mt-6 text-center text-xs text-slate-400">
          Aplicação de Lista de Tarefas didática construída com React e Tailwind CSS
        </footer>
      </div>
    </div>
  );
}
