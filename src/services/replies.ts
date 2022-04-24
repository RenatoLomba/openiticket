import { ResponseError } from '../helpers/errors';
import { supabaseClient } from '../libs/supabase';
import { CreateReplyDto, Reply } from './types/replies.types';

export const repliesService = {
  async create({ attachments, message, ticket_id }: CreateReplyDto) {
    const session = supabaseClient.auth.session();

    if (!session || !session.user) {
      throw new ResponseError({ title: 'Usuário não autenticado' });
    }

    const { id: user_id, user_metadata } = session.user;

    const { data, error } = await supabaseClient.from<Reply>('replies').insert([
      {
        attachments,
        message,
        ticket_id,
        user_id,
        user: {
          id: user_id,
          full_name: user_metadata.full_name,
          avatar_url: user_metadata.avatar_url,
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

  subscribeReplies(onNewReply: (r: Reply) => Promise<void>) {
    const repliesSubscription = supabaseClient
      .from<Reply>('replies')
      .on('INSERT', async (payload) => {
        await onNewReply(payload.new);
      })
      .subscribe();

    return repliesSubscription;
  },
};
