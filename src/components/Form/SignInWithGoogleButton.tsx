import { FC } from 'react';

import { Button } from '../Button';

import { useAuth } from '../../hooks/useAuth';

const SignInWithGoogleButton: FC = () => {
  const { signIn } = useAuth();

  return (
    <Button
      onClick={() => signIn({ provider: 'google' })}
      bg="tomato"
      _hover={{
        bg: 'tomato',
        filter: 'brightness(0.9)',
      }}
      _active={{
        bg: 'tomato',
        filter: 'brightness(1.1)',
      }}
      type="button"
    >
      Entrar com Google
    </Button>
  );
};

export { SignInWithGoogleButton };
