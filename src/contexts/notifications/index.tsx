import { createContext } from 'react';
import { NotificationsContextData } from './types';

export const NotificationsContext = createContext(
  {} as NotificationsContextData,
);
