# Monitor de Faltas (IHC) — Heurísticas de Nielsen

Protótipo em **React + Vite** que simula a tela de **Relatório de Faltas** (inspirada no SIGAA) e apresenta **4 versões navegáveis** da mesma funcionalidade para evidenciar, na prática, a aplicação das **Heurísticas de Usabilidade de Jakob Nielsen**.

A navegação entre versões fica no topo (barra fixa) e o painel superior descreve a evolução selecionada e as heurísticas aplicadas.

## Rodando o projeto

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Onde fica cada versão

- `src/App.jsx`: barra de seleção das versões + painel com descrição/heurísticas.
- `src/versions/V1.jsx`: **Versão Inicial** (baseline, sem heurísticas).
- `src/versions/V2.jsx`: **Evolução 1** (H1 + H4).
- `src/versions/V3.jsx`: **Evolução 2** (H5 + H6 + H9).
- `src/versions/V4.jsx`: **Evolução Final** (H2 + H7 + H8 + H10).
- `src/data.js`: dados mockados de discentes e componentes/turmas.

## Evoluções e heurísticas (foco do trabalho)

Resumo rápido:

| Versão | Arquivo | Heurísticas aplicadas |
| --- | --- | --- |
| Versão Inicial | `src/versions/V1.jsx` | — |
| Evolução 1 | `src/versions/V2.jsx` | H1, H4 |
| Evolução 2 | `src/versions/V3.jsx` | H5, H6, H9 |
| Evolução Final | `src/versions/V4.jsx` | H2, H7, H8, H10 |

### Versão Inicial (V1) — sem heurísticas aplicadas

Objetivo: servir como **linha de base** para comparação.

O que caracteriza esta versão:

- Interface “crua” e próxima do HTML antigo: tabela simples, formulário com campos ambíguos.
- Feedback mínimo: a busca não tem indicador de carregamento e o erro é apenas “Discente não encontrado”.
- Sem distinção visual clara para criticidade (percentuais aparecem como texto).

### Evolução 1 (V2) — H1 + H4

**H1 — Visibilidade do status do sistema**

- Exibe status durante a busca (`Buscando discente...`) e feedback após concluir (`Discente encontrado` / `Discente não encontrado`).
- Botão muda para `Buscando...` e fica desabilitado enquanto carrega.

**H4 — Consistência e padrões**

- Introduz topbar e breadcrumb, reforçando estrutura e contexto de navegação.
- Card de “critérios de busca” e “resultado” com hierarquia visual mais previsível.

O que mudou na prática:

- O usuário passa a entender claramente **o que está acontecendo** (carregando vs. pronto).
- A interface fica mais próxima de um padrão consistente de aplicação.

### Evolução 2 (V3) — H5 + H6 + H9

**H5 — Prevenção de erros**

- Campo de busca tratado como obrigatório (mensagem ao tentar buscar vazio).
- Sugestões só aparecem a partir de **2 caracteres**, reduzindo “chutes” e ruído.
- Campo sinaliza erro e orienta antes de prosseguir.

**H6 — Reconhecimento em vez de memorização**

- Autocomplete com dropdown de sugestões (nome + matrícula), permitindo selecionar sem lembrar exatamente o identificador.

**H9 — Ajudar usuários a reconhecer, diagnosticar e recuperar erros**

- Mensagens de erro mais específicas e acionáveis (ex.: instrução para conferir nome/matrícula).
- Feedback visual próximo ao campo (erro/hint), reduzindo a ambiguidade.

O que mudou na prática:

- A busca fica mais “guiada”: o usuário recebe ajuda enquanto digita, e erros ficam fáceis de entender/corrigir.
- A tabela passa a ter indicação de situação (Normal/Atenção/Crítico) com badges.

Regras de sinalização usadas a partir desta evolução:

- **Crítico**: ≥ 25% de faltas
- **Atenção**: ≥ 15% de faltas
- **Normal**: abaixo de 15%

### Evolução Final (V4) — H2 + H7 + H8 + H10

**H2 — Correspondência entre o sistema e o mundo real**

- Linguagem mais direta e contextual (ex.: “reprovação por frequência”, “limite permitido”).
- Indicadores e textos explicam o impacto (≥ 25% como risco real, não apenas um número).

**H7 — Flexibilidade e eficiência de uso**

- Alternância entre duas formas de visualização do detalhamento:
  - `Tabela` (comparação rápida)
  - `Visual` (cards + barra de progresso por componente)
- Mantém atalhos práticos (Enter para buscar, clique em sugestão).

**H8 — Estética e design minimalista**

- Resumo em cards (Discente, Turmas, Situação crítica, Atenção) para “entender em 1 olhar”.
- Paleta e hierarquia tipográfica mais limpa (chips, barras, espaçamentos, bordas sutis).

**H10 — Ajuda e documentação**

- Painel `? Ajuda` com instruções de uso e legenda de criticidade.
- Ajuda contextual sem tirar o usuário da tela.

O que mudou na prática:

- Fica mais simples identificar “onde está o problema” (resumo + visual).
- A interface passa a explicar o significado dos dados (não só mostrar números).
- O usuário tem ajuda “na hora” sem depender de instrução externa.

## Notas

- Este projeto é um **protótipo didático** (dados mockados) para demonstrar heurísticas; não é um sistema integrado real.
