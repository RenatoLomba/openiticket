import Head from 'next/head';
import { NextPage } from 'next';

import { Header } from '../../components/Header';
import { AppGrid } from '../../components/AppGrid';
import { Sidebar } from '../../components/Sidebar';
import { Authenticated } from '../../components/Authenticated';
import { CreateTicketForm } from '../../components/Tickets/CreateTicketForm';

const CreateTicketPage: NextPage = () => {
  return (
    <Authenticated>
      <Head>
        <title>Criar Ticket | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <AppGrid>
        <Sidebar gridArea="sidebar" />
        <Header title="Cadastro de Tickets" gridArea="header" />
        <CreateTicketForm gridArea="content" />
      </AppGrid>
    </Authenticated>
  );
};

export default CreateTicketPage;
