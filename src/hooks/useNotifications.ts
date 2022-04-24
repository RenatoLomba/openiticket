import { useContext } from 'react';
import { NotificationsContext } from '../contexts/notifications';

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
