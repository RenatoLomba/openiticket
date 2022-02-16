import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { supabaseClient } from '../libs/supabase';

const NotAuthenticated: FC = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const session = supabaseClient.auth.session();

    if (session) {
      router.push('/tickets');
    }
  });

  return <>{children}</>;
};

export { NotAuthenticated };
