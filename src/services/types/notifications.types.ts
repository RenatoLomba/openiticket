import { Ticket } from './tickets.types';

interface User {
  id: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Notification {
  id: number;
  ticket: Ticket;
  message: string;
  created_at: string;
  user: User;
  user_id: string;
}
