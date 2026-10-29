# Minhas Tarefas 📋

Uma aplicação de lista de tarefas (To-Do List) moderna, intuitiva e didática, desenvolvida em **React 19**, **TypeScript** e **Tailwind CSS**. 

Este projeto foi especialmente desenhado para quem está **começando a aprender desenvolvimento de software**, trazendo uma estrutura de código limpa, desacoplada em componentes bem documentados e com testes automatizados completos.

---

## 🚀 Funcionalidades

- **Adição Rápida de Atividades**: Digite a tarefa e confirme com o botão *"Adicionar"* ou pressionando a tecla `Enter`.
- **Diferenciação Visual Clara**:
  - **Pendentes**: Cartão branco com borda suave, convidando à ação.
  - **Concluídas**: Fundo acinzentado suave, texto riscado e em itálico, com indicador verde `· Concluída`.
- **Filtros de Visualização**: Controle segmentado com abas (*Todas*, *Pendentes*, *Concluídas*) exibindo o número de itens em cada categoria em tempo real.
- **Barra de Progresso Dinâmica**: Indicador visual que calcula automaticamente a porcentagem de conclusão das suas tarefas.
- **Ações Rápidas**: Botão de exclusão individual (lixeira) e botão *"Limpar concluídas"* que surge quando há itens finalizados.
- **Persistência no Navegador (`LocalStorage`)**: As tarefas ficam salvas localmente, mantendo seus dados mesmo ao recarregar ou fechar a aba.
- **Guia Didático Embutido**: Seção expansível na parte inferior da interface explicando os conceitos fundamentais utilizados na criação do projeto.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)**: Biblioteca para construção de interfaces reativas baseadas em componentes.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática, prevenindo erros em tempo de desenvolvimento.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de estilização utilitária para criação rápida de designs modernos e responsivos.
- **[Vite 8](https://vite.dev/)**: Ferramenta de build e servidor de desenvolvimento ultrarrápido.
- **[Lucide React](https://lucide.dev/)**: Conjunto de ícones leves e elegantes.
- **[Vitest](https://vitest.dev/)** + **[React Testing Library](https://testing-library.com/)**: Ambiente de testes automatizados com simulação de DOM via `jsdom`.

---

## 📂 Estrutura do Projeto

O código foi organizado seguindo as melhores práticas de modularização para que você compreenda onde cada responsabilidade reside:

```text
├── index.html                     # Ponto de entrada HTML e importação de fontes
├── package.json                   # Dependências e scripts do projeto
├── tsconfig.json                  # Configuração do TypeScript
├── vite.config.ts                 # Configuração do servidor Vite e Tailwind
├── vitest.config.ts               # Configuração do Vitest e ambiente jsdom
├── src/
│   ├── main.tsx                   # Ponto de entrada do React que monta o App no DOM
│   ├── index.css                  # Estilos globais e configuração de fontes
│   ├── types.ts                   # Interfaces TypeScript (Task e FilterType)
│   ├── App.tsx                    # Componente raiz: estado principal e persistência
│   ├── App.test.tsx               # Testes de integração de ponta a ponta
│   ├── test/
│   │   └── setup.ts               # Configuração do ambiente de testes (Jest-DOM)
│   └── components/
│       ├── TaskHeader.tsx         # Cabeçalho com título, ícone e data atual
│       ├── TaskInput.tsx          # Campo de texto controlado com validação
│       ├── TaskInput.test.tsx     # Testes unitários do formulário de entrada
│       ├── TaskStats.tsx          # Barra de progresso e abas de filtro
│       ├── TaskStats.test.tsx     # Testes unitários dos filtros e progresso
│       ├── TaskList.tsx           # Mapeamento e renderização da lista de tarefas
│       ├── TaskItem.tsx           # Item individual (checkbox, estilos, botão excluir)
│       ├── TaskItem.test.tsx      # Testes unitários do item de tarefa
│       └── EmptyState.tsx         # Mensagens visuais quando não há tarefas
```

---

## 🧠 Conceitos de Programação Ensinados no Código

Se você está começando a estudar React, observe atentamente estes conceitos aplicados no projeto:

### 1. Estado no React (`useState`)
O estado armazena as informações que, ao mudarem, provocam a atualização da tela.
- **No `App.tsx`**: Gerenciamos o array de tarefas (`tasks`) e o filtro atual (`filter`).
- **No `TaskInput.tsx`**: Gerenciamos o que o usuário está digitando no momento (`inputValue`).

### 2. Imutabilidade e o Operador Spread (`...`)
No React nunca alteramos um array diretamente (como usar `tasks.push()`). Em vez disso, criamos uma nova versão do array:
```typescript
// Adicionando uma nova tarefa no início:
setTasks(prevTasks => [newTask, ...prevTasks]);

// Removendo um item com .filter():
setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

// Atualizando um item com .map():
setTasks(prevTasks =>
  prevTasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )
);
```

### 3. Efeitos e Ciclo de Vida (`useEffect`)
Usamos o `useEffect` para sincronizar automaticamente as tarefas com o `localStorage` do navegador sempre que o estado `tasks` sofrer alguma modificação.

### 4. Fluxo Unidirecional de Dados (Props e Callbacks)
O componente pai (`App.tsx`) possui o estado e repassa dados para os componentes filhos via **props** (ex: `<TaskItem task={task} />`). Quando o usuário clica em algo no filho, ele dispara uma função de retorno (callback) enviada pelo pai (ex: `onToggle(task.id)`).

### 5. Estilização Condicional
Usamos o operador ternário para alterar classes visuais com base no status da tarefa:
```tsx
className={task.completed ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}
```

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Gerenciador de pacotes `npm`

### Passos

1. **Instalar as dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Abra seu navegador no endereço indicado (por padrão: `http://localhost:3000`).

3. **Executar a suíte de testes automatizados**:
   ```bash
   npm test
   ```
   Roda todos os 17 testes unitários e de integração utilizando o Vitest.

4. **Verificar os tipos do TypeScript (Lint)**:
   ```bash
   npm run lint
   ```

5. **Gerar a versão de produção**:
   ```bash
   npm run build
   ```

---

## 🧪 Cobertura dos Testes Automatizados

O projeto conta com **17 testes automatizados** cobrindo todas as funcionalidades essenciais:
- **`TaskItem`**: Verifica estados visuais (ativo vs concluído), cliques de seleção e remoção.
- **`TaskInput`**: Testa prevenção de tarefas vazias, submissão com Enter e limpeza do campo.
- **`TaskStats`**: Testa precisão dos cálculos de porcentagem, contadores das abas e limpeza em lote.
- **`App` (Integração)**: Testa o fluxo completo de uso e a persistência em `localStorage`.

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0).
