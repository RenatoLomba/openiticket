import { supabaseClient } from '../libs/supabase';
import { ResponseError } from '../helpers/errors';
import { serviceHandler } from '../helpers/serviceHandler';

export const sessionService = {
  async verifyUser() {
    const { data, error } = await serviceHandler(async () => {
      const session = supabaseClient.auth.session();

      if (!session || !session.user) {
        throw new ResponseError({
          title: 'Usuário não autenticado',
          description:
            'Verifique se você está conectado corretamente e tente novamente',
        });
      }

      return session;
    });

    return { data, error };
  },
};
