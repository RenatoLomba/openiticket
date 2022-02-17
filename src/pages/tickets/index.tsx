import Head from 'next/head';
import { NextPage } from 'next';

import { Header } from '../../components/Header';
import { AppGrid } from '../../components/AppGrid';
import { Sidebar } from '../../components/Sidebar';
import { Tickets } from '../../components/Tickets';
import { Authenticated } from '../../components/Authenticated';

const TicketsPage: NextPage = () => {
  return (
    <Authenticated>
      <Head>
        <title>Tickets | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <AppGrid>
        <Sidebar gridArea="sidebar" />
        <Header title="Tickets" gridArea="header" />
        <Tickets gridArea="content" />
      </AppGrid>
    </Authenticated>
  );
};

export default TicketsPage;
