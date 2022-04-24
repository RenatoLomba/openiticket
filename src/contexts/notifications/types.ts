interface IUser {
  id: string;
  full_name: string;
  avatar_url?: string;
}

export interface INotification {
  id: number;
  created_at_formatted: string;
  message: string;
  ticket_id: number;
  user: IUser;
}

export interface NotificationsContextData {
  notifications: INotification[];
  notificationsDrawerIsOpen: boolean;
  closeNotificationsDrawer: () => void;
  openNotificationsDrawer: () => void;
  notificationsVisualized: boolean;
  setNotificationsVisualized: (visualized: boolean) => void;
}
