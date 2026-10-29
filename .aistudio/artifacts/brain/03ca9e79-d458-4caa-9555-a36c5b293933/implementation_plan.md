# Plano de Implementação: Lista de Tarefas (To-Do List)

Aplicação interativa de lista de tarefas desenvolvida em React e TypeScript, projetada para aliar facilidade de uso, visual moderno e limpo, e uma estrutura de código didática voltada a quem está começando a aprender desenvolvimento de software.

---

## Decisões Confirmadas com o Usuário

> [!IMPORTANT]
> As preferências informadas na etapa de alinhamento guiam esta implementação:

- **Armazenamento**: Local no navegador (`localStorage`), sem necessidade de servidores, contas ou login, garantindo que as tarefas permaneçam salvas mesmo ao fechar ou recarregar a página.
- **Funcionalidades de Organização**: Além do fluxo essencial (adicionar, concluir e remover), a aplicação incluirá filtros de visualização (*Todas*, *Ativas*, *Concluídas*) e uma barra de progresso com porcentagem de conclusão.
- **Identidade Visual**: Interface clara, moderna e minimalista, utilizando a paleta neutra e toques sutis com Tailwind CSS, sem poluição visual.

---

## 1. Visão Geral e Conceito do Projeto

### O que o aplicativo faz
Permite ao usuário gerenciar suas atividades diárias de forma rápida e intuitiva:
1. Digitar uma nova tarefa e adicioná-la com o botão ou pressionando `Enter`.
2. Alternar o status de conclusão com um clique no marcador (checkbox).
3. Excluir tarefas individuais ou limpar todas as tarefas concluídas.
4. Filtrar a visualização para focar no que ainda precisa ser feito ou rever o que já foi finalizado.
5. Acompanhar a evolução através de um indicador de progresso em tempo real.

### Valor Didático
Para quem está aprendendo programação frontend, o projeto exemplifica com clareza:
- **Estados no React (`useState`)**: Como gerenciar dados que mudam na tela.
- **Efeitos e Ciclo de Vida (`useEffect`)**: Como salvar e carregar dados do `localStorage` de forma automática.
- **Divisão em Componentes**: Como desacoplar uma aplicação em partes menores, reutilizáveis e fáceis de ler.
- **Manipulação de Listas e Imutabilidade**: Adicionar itens com `[...tasks, newTask]`, filtrar com `.filter()` e atualizar com `.map()`.

---

## 2. Experiência do Usuário e Design Visual

### Fluxos Principais
1. **Adição de Tarefa**: Campo de texto com foco convidativo, validação contra tarefas vazias e atalho de teclado `Enter`.
2. **Conclusão de Tarefa**: Clique na caixa de seleção que ativa uma transição suave, aplicando estilo riscado (*line-through*) e tom atenuado ao texto.
3. **Filtragem Dinâmica**: Controle segmentado com abas (*Todas*, *Pendentes*, *Concluídas*) exibindo o contador numérico de cada grupo.
4. **Remoção Segura**: Botão discreto de exclusão (ícone de lixeira) que ganha destaque no foco/hover, permitindo deletar itens indesejados.
5. **Estado Vazio**: Mensagens amigáveis e contextualizadas quando a lista estiver vazia ou quando um filtro específico não retornar tarefas.

### Identidade Visual e Estilo
- **Cores**: Fundo em tom neutro suave (`bg-slate-50`), cartões e superfícies em branco puro (`bg-white`), bordas finas sutis (`border-slate-200`) e cor de destaque primária em azul moderno (`indigo-600` / `blue-600`) para ações principais.
- **Tipografia**: Hierarquia limpa e equilibrada, usando números tabulares (`tabular-nums`) para contadores de tarefas e porcentagem.
- **Feedback Interativo**: Efeito suave ao passar o mouse sobre itens, foco visível para acessibilidade e transições de cor rápidas (< 150ms).

---

## 3. Arquitetura Técnica e Organização dos Componentes

O código será organizado em componentes modulares e bem documentados com comentários explicativos:

```
┌─────────────────────────────────────────────────────────────┐
│                          App.tsx                            │
│  - Estado principal: `tasks` e `filter`                     │
│  - Persistência: leitura e escrita no `localStorage`        │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
       ┌───────┴───────┐              ┌───────┴───────┐
       ▼               ▼              ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  TaskHeader  │ │  TaskInput   │ │  TaskStats   │ │   TaskList   │
│ - Título     │ │ - Input text │ │ - Progresso  │ │ - Mapeia     │
│ - Resumo     │ │ - Btn Adic.  │ │ - Abas filtro│ │   TaskItem   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────┬───────┘
                                                          │
                                                  ┌───────┴───────┐
                                                  ▼               ▼
                                           ┌──────────────┐ ┌──────────────┐
                                           │   TaskItem   │ │  EmptyState  │
                                           │ - Checkbox   │ │ - Mensagem   │
                                           │ - Título     │ │   amigável   │
                                           │ - Botão Del  │ └──────────────┘
                                           └──────────────┘
```

### Estrutura de Dados
```typescript
interface Task {
  id: string;        // Identificador único (gerado via crypto.randomUUID ou Date.now)
  title: string;     // Texto descritivo da tarefa
  completed: boolean;// Se a tarefa foi concluída ou não
  createdAt: number; // Timestamp da criação para ordenação
}

type FilterType = 'all' | 'active' | 'completed';
```

---

## 4. Etapas de Execução

1. **Atualizar Metadados**: Configurar `metadata.json` e `<title>` em `index.html` com o nome e descrição apropriados da aplicação.
2. **Criar Tipos e Utilitários de Armazenamento**: Definir a interface `Task` e a chave padronizada do `localStorage`.
3. **Desenvolver Componentes Modulares**:
   - `TaskHeader`: Cabeçalho limpo com nome do app e data atual formatada em português.
   - `TaskInput`: Campo de entrada intuitivo com tecla `Enter` e validação.
   - `TaskStats`: Barra de progresso visual com cálculo de percentual e abas de filtro segmentadas.
   - `TaskItem`: Item da lista com checkbox interativo, texto com estado concluído e botão de remoção.
   - `EmptyState`: Mensagem acolhedora quando não houver tarefas para exibir.
4. **Integrar no `App.tsx`**: Centralizar o estado, conectar as operações (`addTask`, `toggleTask`, `deleteTask`, `clearCompleted`) e garantir sincronização reativa com o `localStorage`.
5. **Adicionar Comentários Didáticos**: Inserir notas explicativas em pontos-chave do código para facilitar o aprendizado dos conceitos de React.
6. **Compilação e Verificação**: Executar `compile_applet` para certificar ausência de erros de tipagem e build.
