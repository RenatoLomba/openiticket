import { PriorityTypes } from '../../helpers/constants/priorities';

interface AttachmentDTO {
  bucket: string;
  path: string;
  publicURL: string;
}

interface CreateTicketDTO {
  title: string;
  description: string;
  priority: PriorityTypes;
  attachments: AttachmentDTO[];
}

interface Ticket {
  id: number;
  user_id: string;
  title: string;
  description: string;
  priority: PriorityTypes;
  attachments: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string;
    created_at: string;
  };
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
}

export type { CreateTicketDTO, Ticket, TicketResponse };
