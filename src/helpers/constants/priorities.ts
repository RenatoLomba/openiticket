export const priorities = {
  high: {
    text: 'ALTA',
    color: 'red.default',
  },
  normal: {
    text: 'NORMAL',
    color: 'green.default',
  },
  low: {
    text: 'BAIXA',
    color: 'yellow.default',
  },
};

export const prioritiesList = [
  { text: 'ALTA', value: 'high' },
  { text: 'NORMAL', value: 'normal' },
  { text: 'BAIXA', value: 'low' },
];

export type PriorityTypes = keyof typeof priorities;
