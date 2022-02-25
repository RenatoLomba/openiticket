import Head from 'next/head';
import { NextPage } from 'next';
import { useState } from 'react';

import { Header } from '../../components/Header';
import { AppGrid } from '../../components/AppGrid';
import { Sidebar } from '../../components/Sidebar';
import { Authenticated } from '../../components/Authenticated';
import { TicketForm } from '../../components/Tickets/TicketForm';

import { PriorityTypes } from '../../helpers/constants/priorities';
import { useCreateTicket } from '../../helpers/mutations/useCreateTicket';
import { useDeleteImages } from '../../helpers/mutations/useDeleteImages';

interface Attachment {
  publicURL: string;
  bucket: string;
  path: string;
}

interface TicketFormData {
  title: string;
  description: string;
  priority: PriorityTypes;
}

const CreateTicketPage: NextPage = () => {
  const { createTicket } = useCreateTicket();
  const { deleteImages, isDeleting: isDeletingAttachments } = useDeleteImages({
    onSuccess: ({ pathsDeleted }) => {
      setAttachments((prev) =>
        prev.filter((prevAt) => prevAt.path !== pathsDeleted[0]),
      );
    },
  });
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const createTicketFormSubmit = async (data: TicketFormData) => {
    await createTicket({ ...data, attachments });
  };

  const handleDeleteAttachment = async (at: Attachment) => {
    await deleteImages({
      bucket: at.bucket,
      pathsToDelete: [at.path],
    });
  };

  return (
    <Authenticated>
      <Head>
        <title>Criar Ticket | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <AppGrid>
        <Sidebar gridArea="sidebar" />
        <Header title="Cadastro de Tickets" gridArea="header" />
        <TicketForm
          gridArea="content"
          attachments={attachments}
          handleDeleteAttachment={handleDeleteAttachment}
          isDeletingAttachment={isDeletingAttachments}
          setAttachments={setAttachments}
          ticketFormSubmit={createTicketFormSubmit}
        />
      </AppGrid>
    </Authenticated>
  );
};

export default CreateTicketPage;
