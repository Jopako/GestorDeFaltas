export const turmas = [
  { id: 'CCC0740', nome: 'Aprendizado de Máquina', aulas: 21, maxFaltas: 5 },
  { id: 'CCC0741', nome: 'Compiladores', aulas: 14, maxFaltas: 3 },
  { id: 'CCC0742', nome: 'Computação Gráfica', aulas: 18, maxFaltas: 4 },
  { id: 'CCC0753', nome: 'Infra e Serviços Web', aulas: 12, maxFaltas: 3 },
]

export const alunos = [
  {
    matricula: '20230001',
    nome: 'Ana Beatriz Souza',
    turmas: {
      'CCC0740': 2,
      'CCC0741': 0,
      'CCC0742': 5,
      'CCC0753': 1,
    },
  },
  {
    matricula: '20230042',
    nome: 'Bruno Carvalho Lima',
    turmas: {
      'CCC0740': 6,
      'CCC0741': 4,
      'CCC0742': 1,
      'CCC0753': 0,
    },
  },
  {
    matricula: '20230087',
    nome: 'Carla Mendes Rocha',
    turmas: {
      'CCC0740': 0,
      'CCC0741': 1,
      'CCC0742': 0,
      'CCC0753': 2,
    },
  },
  {
    matricula: '20230115',
    nome: 'Diego Ferreira Nunes',
    turmas: {
      'CCC0740': 4,
      'CCC0741': 3,
      'CCC0742': 3,
      'CCC0753': 5,
    },
  },
  {
    matricula: '20230203',
    nome: 'Eduarda Teixeira Costa',
    turmas: {
      'CCC0740': 1,
      'CCC0741': 0,
      'CCC0742': 2,
      'CCC0753': 3,
    },
  },
  {
    matricula: '20230298',
    nome: 'Felipe Santos Brito',
    turmas: {
      'CCC0740': 7,
      'CCC0741': 5,
      'CCC0742': 4,
      'CCC0753': 6,
    },
  },
]
