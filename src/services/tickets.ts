import { supabaseClient } from '../libs/supabase';
import { ResponseError } from '../helpers/errors';
import {
  CreateTicketDTO,
  Ticket,
  TicketResponse,
  UpdateTicketDTO,
} from './types/tickets.types';

export const ticketsService = {
  async createTicket({
    attachments,
    description,
    priority,
    title,
  }: CreateTicketDTO) {
    const session = supabaseClient.auth.session();

    if (!session || !session.user) {
      throw new ResponseError({ title: 'Usuário não autenticado' });
    }

    const {
      id: user_id,
      user_metadata,
      created_at: user_created_at,
    } = session.user;

    const { data, error } = await supabaseClient
      .from<Ticket>('tickets')
      .insert([
        {
          title,
          description,
          priority,
          user_id,
          attachments,
          user: {
            id: user_id,
            full_name: user_metadata.full_name,
            avatar_url: user_metadata.avatar_url,
            created_at: user_created_at,
          },
        },
      ]);

    if (error || !data) {
      throw new ResponseError({
        title: error?.message,
        description: error?.details,
      });
    }

    return data[0];
  },

  async getTickets(page: number, size: number) {
    const from = (page - 1) * size;
    const to = from + (size - 1);

    const { data, error } = await supabaseClient
      .from<Ticket>('tickets')
      .select(
        `
          id,
          title, 
          created_at, 
          updated_at, 
          priority,
          user
        `,
      )
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error || !data) {
      throw new ResponseError({
        title: error?.message,
        description: error?.details,
      });
    }

    const tickets: TicketResponse[] = data.map((ticket) => {
      const createdAtDate = new Date(ticket.created_at);
      const updatedAtDate = new Date(ticket.updated_at);

      const difference = new Date().getTime() - updatedAtDate.getTime();

      const days = Math.ceil(difference / (1000 * 3600 * 24));

      return {
        ...ticket,
        updated_at: `Atualizado a ${days} dias atrás`,
        created_at_date: createdAtDate.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        created_at_hour: createdAtDate.toLocaleTimeString('pt-BR', {
          hour: 'numeric',
          minute: '2-digit',
        }),
        user: {
          ...ticket.user,
          created_at: new Date(ticket.user.created_at).toLocaleDateString(),
        },
      };
    });

    return tickets;
  },

  async getTicket(id: number) {
    const { data, error } = await supabaseClient
      .from<Ticket>('tickets')
      .select(
        `
        id,
        title,
        description,
        priority,
        attachments
      `,
      )
      .eq('id', id)
      .single();

    if (!data || error) {
      throw new ResponseError({
        code: 500,
        title: error?.message,
        description: error?.details,
      });
    }

    return data;
  },

  async updateTicket(dto: UpdateTicketDTO) {
    const { data, error } = await supabaseClient
      .from<Ticket>('tickets')
      .update({
        ...dto,
      })
      .match({ id: dto.id });

    if (!data || error) {
      throw new ResponseError({
        code: 500,
        title: error?.message,
        description: error?.details,
      });
    }

    return data[0];
  },
};
