/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Interface que representa uma única tarefa no sistema.
 * 
 * Didática para iniciantes:
 * Em TypeScript, usamos `interface` para definir o "formato" ou o contrato
 * que um objeto deve seguir. Qualquer objeto de tarefa precisa ter
 * exatamente esses 4 campos com os tipos especificados.
 */
export interface Task {
  /** Identificador único para a tarefa (usado como 'key' no React) */
  id: string;

  /** O texto ou descrição do que precisa ser feito */
  title: string;

  /** Indica se a tarefa já foi marcada como concluída (true) ou está pendente (false) */
  completed: boolean;

  /** Data e hora de criação (timestamp numérico, útil para ordenação cronológica) */
  createdAt: number;
}

/**
 * Tipo que representa os filtros possíveis de exibição.
 * Usamos união de literais ('all' | 'active' | 'completed') para garantir
 * que apenas esses três valores possam ser usados como filtro.
 */
export type FilterType = 'all' | 'active' | 'completed';
