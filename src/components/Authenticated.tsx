import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { supabaseClient } from '../libs/supabase';

const Authenticated: FC = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const session = supabaseClient.auth.session();

    if (!session) {
      router.push('/');
    }
  });

  return <>{children}</>;
};

export { Authenticated };
