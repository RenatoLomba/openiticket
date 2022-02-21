import { Session } from '@supabase/supabase-js';
import { ResponseError } from '../helpers/errors';
import { supabaseClient } from '../libs/supabase';

export const sessionService = {
  verifyUser() {
    let session: Session | null = null;
    let error: ResponseError | null = null;

    try {
      session = supabaseClient.auth.session();

      if (!session || !session.user) {
        throw new ResponseError(
          400,
          'Usuário não autenticado',
          'Verifique se você está conectado corretamente e tente novamente',
        );
      }
    } catch (ex) {
      error = ex as ResponseError;
    }

    return { session, error };
  },
};
