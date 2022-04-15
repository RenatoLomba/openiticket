import { supabaseClient } from '../libs/supabase';
import { ResponseError } from '../helpers/errors';
import {
  CreateTicketDTO,
  GetTicketResponse,
  Ticket,
  TicketResponse,
  UpdateTicketDTO,
} from './types/tickets.types';
import { SortTypes } from '../helpers/constants/sorters';

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

  async getTickets(
    page: number,
    size: number,
    sortBy: SortTypes = 'created_at',
  ) {
    const from = (page - 1) * size;
    const to = from + (size - 1);

    let query = supabaseClient
      .from<Ticket>('tickets')
      .select(
        `
          id,
          title, 
          created_at, 
          updated_at, 
          priority,
          user,
          is_resolved,
          resolved_at
        `,
        { count: 'exact' },
      )
      .range(from, to);

    switch (sortBy) {
      case 'created_at':
        query = query.order('created_at', { ascending: false });
        break;
      case 'alpha':
        query = query.order('title', { ascending: true });
        break;
    }

    const { data, error, count } = await query;

    if (error || !data || !count) {
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

      const ticketResponse: TicketResponse = {
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

      return ticketResponse;
    });

    return {
      tickets,
      fromTicket: from + 1,
      toTicket: from + tickets.length,
      totalTicketsCount: count,
    };
  },

  async getTicket(id: number) {
    const { data, error } = await supabaseClient
      .from<Ticket>('tickets')
      .select(
        `
        id,
        title,
        user_id,
        user,
        description,
        priority,
        attachments,
        is_resolved,
        resolved_at,
        replies (
          id,
          message,
          created_at,
          attachments,
          user_id,
          user
        )
      `,
      )
      .eq('id', id)
      .order('created_at', { ascending: false, foreignTable: 'replies' })
      .single();

    if (!data || error) {
      throw new ResponseError({
        code: 500,
        title: error?.message,
        description: error?.details,
      });
    }

    let ticket: GetTicketResponse = {
      ...data,
      replies: data.replies.map((reply) => {
        const createdAtDate = new Date(reply.created_at);

        return {
          ...reply,
          created_at_date: createdAtDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
          created_at_hour: createdAtDate.toLocaleTimeString('pt-BR', {
            hour: 'numeric',
            minute: '2-digit',
          }),
        };
      }),
    };

    if (data.resolved_at) {
      const resolvedAtDate = new Date(data.resolved_at);

      ticket = {
        ...ticket,
        resolved_at_date: resolvedAtDate.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        resolved_at_hour: resolvedAtDate.toLocaleTimeString('pt-BR', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      };
    }

    return ticket;
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

  async resolveTicket(ticket_id: number) {
    const { data, error } = await supabaseClient
      .from<Ticket>('tickets')
      .update({
        is_resolved: true,
        resolved_at: new Date().toUTCString(),
      })
      .match({ id: ticket_id });

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
