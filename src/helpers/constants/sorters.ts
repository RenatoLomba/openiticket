export type Sorter = {
  value: string;
  text: string;
};

export const sorters: Sorter[] = [
  { value: 'created_at', text: 'Ordem de criação' },
  { value: 'alpha', text: 'Ordem alfabética' },
  { value: 'prior', text: 'Ordem de prioridade' },
];
