import Head from 'next/head';
import NextLink from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Heading, Link, Text, Alert, AlertIcon } from '@chakra-ui/react';

import { Card } from '../components/Card';
import { SignInForm } from '../components/Form/SignInForm';
import { NotAuthenticated } from '../components/NotAuthenticated';
import { FormScreenContainer } from '../components/Form/FormScreenContainer';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <NotAuthenticated>
      <FormScreenContainer>
        <Head>
          <title>Login | {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>

        <Card maxWidth="380px">
          <Heading textAlign="center" size="lg">
            Faça Login na aplicação
          </Heading>

          <Text fontSize="sm" color="grayscale.gray" textAlign="center" mt="4">
            Digite seu e-mail e senha abaixo
          </Text>

          {router.query.success && (
            <Alert mt="8" status="success">
              <AlertIcon />
              {router.query.message}
            </Alert>
          )}

          <SignInForm />

          <Text textAlign="center" mt="8" color="grayscale.gray" fontSize="sm">
            Não possui uma conta?{' '}
            <NextLink href="/signup" passHref>
              <Link as="a" color="accent.default">
                Cadastre-se
              </Link>
            </NextLink>
          </Text>
        </Card>
      </FormScreenContainer>
    </NotAuthenticated>
  );
};

export default Home;
