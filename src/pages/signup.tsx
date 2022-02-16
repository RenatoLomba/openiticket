import Head from 'next/head';
import NextLink from 'next/link';
import type { NextPage } from 'next';
import { Heading, Link, Text } from '@chakra-ui/react';

import { Card } from '../components/Card';
import { SignUpForm } from '../components/Form/SignUpForm';
import { NotAuthenticated } from '../components/NotAuthenticated';
import { FormScreenContainer } from '../components/Form/FormScreenContainer';

const SignUpPage: NextPage = () => {
  return (
    <NotAuthenticated>
      <FormScreenContainer>
        <Head>
          <title>Cadastro | {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>

        <Card maxWidth="380px">
          <Heading textAlign="center" size="lg">
            Cadastre-se na aplicação
          </Heading>

          <Text fontSize="sm" color="grayscale.gray" textAlign="center" mt="4">
            Digite seus dados abaixo para fazer o cadastro
          </Text>

          <SignUpForm />

          <Text textAlign="center" mt="8" color="grayscale.gray" fontSize="sm">
            Já possui uma conta?{' '}
            <NextLink href="/" passHref>
              <Link as="a" color="accent.default">
                Faça login
              </Link>
            </NextLink>
          </Text>
        </Card>
      </FormScreenContainer>
    </NotAuthenticated>
  );
};

export default SignUpPage;
