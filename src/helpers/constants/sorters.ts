import { IconType } from 'react-icons';
import { FaSortAmountUp, FaSortAlphaUp } from 'react-icons/fa';

export type SortTypes = 'created_at' | 'alpha';

export type Sorter = {
  value: SortTypes;
  text: string;
  icon: IconType;
};

export const sorters: Sorter[] = [
  { value: 'created_at', text: 'Ordem de criação', icon: FaSortAmountUp },
  { value: 'alpha', text: 'Ordem alfabética', icon: FaSortAlphaUp },
];
