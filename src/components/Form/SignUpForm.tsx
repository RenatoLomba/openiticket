import { FC } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '../../components/Button';
import { Input } from '../../components/Form/Input';

import { useAuth } from '../../hooks/useAuth';
import { createUserFormSchema } from '../../helpers/yup';

interface CreateUserFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUpForm: FC = () => {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });

  const createUserFormSubmit: SubmitHandler<CreateUserFormData> = async (
    data,
  ) => {
    await signUp({
      ...data,
      full_name: `${data.first_name.trim()} ${data.last_name.trim()}`,
    });
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(createUserFormSubmit)}
      mt="8"
      spacing={6}
    >
      <Flex flexDir={{ base: 'column', sm: 'row' }} gap="4" w="100%">
        <Input
          {...register('first_name')}
          error={errors.first_name}
          name="first_name"
          type="text"
          label="Primeiro nome"
        />

        <Input
          {...register('last_name')}
          error={errors.last_name}
          name="last_name"
          type="text"
          label="Último nome"
        />
      </Flex>

      <Input
        {...register('email')}
        error={errors.email}
        name="email"
        type="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
      />

      <Flex flexDir={{ base: 'column', sm: 'row' }} gap="4" w="100%">
        <Input
          {...register('password')}
          error={errors.password}
          name="password"
          type="password"
          label="Senha"
        />

        <Input
          {...register('password_confirmation')}
          error={errors.password_confirmation}
          name="password_confirmation"
          type="password"
          label="Confirmar senha"
        />
      </Flex>

      <Button type="submit" isLoading={isSubmitting}>
        Cadastrar
      </Button>
    </VStack>
  );
};

export { SignUpForm };
