import { FC } from 'react';
import { VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from './Input';
import { Button } from '../Button';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';

import { useAuth } from '../../hooks/useAuth';
import { signInUserFormSchema } from '../../helpers/yup';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm: FC = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInUserFormSchema) });

  const signInFormSubmit = async ({ email, password }: SignInFormData) => {
    await signIn({ email, password });
  };

  return (
    <VStack
      as="form"
      mt="8"
      spacing={6}
      onSubmit={handleSubmit(signInFormSubmit)}
    >
      <Input
        {...register('email')}
        error={errors.email}
        name="email"
        type="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
      />

      <Input
        {...register('password')}
        error={errors.password}
        name="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
      />

      <Button isLoading={isSubmitting} type="submit">
        Entrar
      </Button>

      <SignInWithGoogleButton />
    </VStack>
  );
};

export { SignInForm };
