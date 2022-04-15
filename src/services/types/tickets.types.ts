import { PriorityTypes } from '../../helpers/constants/priorities';
import { Reply } from './replies.types';

interface Attachment {
  bucket: string;
  path: string;
  publicURL: string;
}

interface CreateTicketDTO {
  title: string;
  description: string;
  priority: PriorityTypes;
  attachments: Attachment[];
}

interface Ticket {
  id: number;
  user_id: string;
  title: string;
  description: string;
  priority: PriorityTypes;
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string;
    created_at: string;
  };
  replies: Reply[];
  is_resolved: boolean;
  resolved_at?: string;
}

interface TicketResponse {
  id: number;
  user_id: string;
  title: string;
  priority: PriorityTypes;
  updated_at: string;
  user: {
    full_name: string;
    avatar_url: string;
    created_at: string;
  };
  created_at_date: string;
  created_at_hour: string;
  is_resolved: boolean;
}

export type ReplyFormatted = Reply & {
  created_at_date: string;
  created_at_hour: string;
};

interface GetTicketResponse {
  id: number;
  title: string;
  user_id: string;
  user: {
    full_name: string;
    avatar_url: string;
    created_at: string;
  };
  description: string;
  priority: PriorityTypes;
  attachments: Attachment[];
  replies: ReplyFormatted[];
  is_resolved: boolean;
  resolved_at?: string;
  resolved_at_date?: string;
  resolved_at_hour?: string;
}

type UpdateTicketDTO = Partial<CreateTicketDTO> & { id: number };

export type {
  Ticket,
  Attachment,
  TicketResponse,
  UpdateTicketDTO,
  CreateTicketDTO,
  GetTicketResponse,
};
