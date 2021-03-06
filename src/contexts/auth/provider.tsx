import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { FC, useEffect, useState } from 'react';

import { AuthContext } from './';
import { supabaseClient } from '../../libs/supabase';
import type { Role, SignInParams, SignUpParams, User } from './types';

const AuthProvider: FC = ({ children }) => {
  const toast = useToast();
  const router = useRouter();

  const [user, setUser] = useState<User>();

  const signUp = async ({ email, full_name, password }: SignUpParams) => {
    const { error } = await supabaseClient.auth.signUp(
      { email, password },
      {
        data: {
          full_name,
          name: full_name,
          email,
        },
      },
    );

    if (error) {
      toast({
        status: 'error',
        title: `Erro ${error?.status}`,
        description: error?.message || 'Erro inesperado',
      });
      return;
    }

    router.push(
      '/?success=Usuário criado&message=Confirme o e-mail em sua caixa de entrada para fazer login',
    );
  };

  const signIn = async ({ email, password, provider }: SignInParams) => {
    const { error } = await supabaseClient.auth.signIn({
      email,
      password,
      provider,
    });

    if (error) {
      toast({
        status: 'error',
        title: `Erro ${error?.status}`,
        description: error?.message || 'Erro inesperado',
      });
      return;
    }
  };

  const signOut = async () => {
    await supabaseClient.auth.signOut();
  };

  const getSessionUser = (sessionParam?: Session | null) => {
    const session = sessionParam || supabaseClient.auth.session();

    if (!session || !session.user) return;

    const { email, id, user_metadata } = session.user;

    setUser({
      id,
      email: email as string,
      full_name: user_metadata?.full_name,
      avatar_url: user_metadata?.avatar_url,
    });
  };

  useEffect(() => {
    getSessionUser();

    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        getSessionUser(session);
        router.push('/tickets');
      }

      if (event === 'SIGNED_OUT') {
        setUser(undefined);
        router.push('/');
      }
    });

    return () => {
      data?.unsubscribe();
    };
  }, []);

  const getUserRoles = async () => {
    const { data, error } = await supabaseClient
      .from<Role>('roles')
      .select('id, roles')
      .eq('user_id', user?.id as string);

    if (!data || error) {
      toast({
        status: 'error',
        title: `Erro ${error?.code}`,
        description: error?.message || 'Erro inesperado',
      });
      return;
    }

    const roles = data[0].roles;

    setUser(
      (user) =>
        ({
          ...user,
          roles,
        } as User),
    );
  };

  useEffect(() => {
    if (user && !user.roles) {
      getUserRoles();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
