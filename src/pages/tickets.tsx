import Head from 'next/head';
import { NextPage } from 'next';
import { Grid } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Authenticated } from '../components/Authenticated';

const TicketsPage: NextPage = () => {
  return (
    <Authenticated>
      <Head>
        <title>Tickets | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <Grid
        templateColumns="255px 1fr"
        templateRows="104px 1fr"
        templateAreas="
          'sidebar header'
          'sidebar content'
        "
        h="100vh"
      >
        <Sidebar gridArea="sidebar" />
        <Header title="Tickets" gridArea="header" />
      </Grid>
    </Authenticated>
  );
};

export default TicketsPage;
