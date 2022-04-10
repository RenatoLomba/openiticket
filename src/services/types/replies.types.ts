import { User } from '../../contexts/auth/types';
import { Attachment } from './tickets.types';

export interface Reply {
  id: number;
  created_at: string;
  ticket_id: number;
  message: string;
  attachments: Attachment[];
  user_id: string;
  user: Partial<User>;
}

export interface CreateReplyDto {
  ticket_id: number;
  message: string;
  attachments: Attachment[];
}
