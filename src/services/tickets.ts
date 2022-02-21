import { sessionService } from './session';
import { supabaseClient } from '../libs/supabase';
import { ResponseError } from '../helpers/errors';

interface AttachmentDTO {
  bucket: string;
  path: string;
  publicURL: string;
}

interface CreateTicketDTO {
  title: string;
  description: string;
  priority: string;
  attachments: AttachmentDTO[];
}

interface TicketResponseDTO {
  id: string;
  title: string;
  description: string;
  priority: string;
  attachments: string;
  created_at: string;
  updated_at: string;
}

export const ticketsService = {
  async createTicket({
    attachments,
    description,
    priority,
    title,
  }: CreateTicketDTO) {
    let data: TicketResponseDTO[] | null = null;
    let error: ResponseError | null = null;

    try {
      const { error: sessionError, session } = sessionService.verifyUser();

      if (sessionError || !session || !session.user) {
        throw new ResponseError(
          sessionError?.code,
          sessionError?.title,
          sessionError?.description,
        );
      }

      const { id: user_id } = session.user;

      const { data: insertData, error: insertError } = await supabaseClient
        .from('tickets')
        .insert([
          {
            title,
            description,
            priority,
            attachments: JSON.stringify(attachments),
            user_id,
          },
        ]);

      if (insertError) {
        throw new ResponseError(
          insertError.code,
          `Error ${insertError.code}`,
          insertError.message,
        );
      }

      data = insertData;
    } catch (ex) {
      error = ex as ResponseError;
    }

    return { data, error };
  },
};
