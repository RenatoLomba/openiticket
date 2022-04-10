import Head from 'next/head';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Header } from '../../components/Header';
import { AppGrid } from '../../components/AppGrid';
import { Sidebar } from '../../components/Sidebar';
import { Authenticated } from '../../components/Authenticated';
import {
  TicketForm,
  TicketFormData,
} from '../../components/Tickets/TicketForm';

import { useGetTicket } from '../../hooks/useGetTicket';
import { useUpdateTicket } from '../../helpers/mutations/useUpdateTicket';
import { useDeleteImages } from '../../helpers/mutations/useDeleteImages';

import { Attachment } from '../../services/types/tickets.types';

const UpdateTicket: NextPage = () => {
  const router = useRouter();
  const ticketId = Number(router.query.id);

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const { updateTicket, isUpdating } = useUpdateTicket();

  const { data: ticket } = useGetTicket(ticketId);

  useEffect(() => {
    if (ticket) {
      setAttachments(ticket.attachments);
    }
  }, [ticket]);

  const { deleteImages, isDeleting: isDeletingAttachments } = useDeleteImages({
    onSuccess: async ({ pathsDeleted }) => {
      const newAttachments = attachments.filter(
        (prevAt) => prevAt.path !== pathsDeleted[0],
      );

      setAttachments(newAttachments);

      await updateTicket({ id: ticketId, attachments: newAttachments });
    },
  });

  const handleDeleteAttachment = async (at: Attachment) => {
    await deleteImages({
      bucket: at.bucket,
      pathsToDelete: [at.path],
    });
  };

  const handleImageUploaded = async (at: Attachment) => {
    const newAttachments = [at, ...attachments];

    setAttachments(newAttachments);

    await updateTicket({ id: ticketId, attachments: newAttachments });
  };

  const updateTicketFormSubmit = async (tk: TicketFormData) => {
    await updateTicket({ id: ticketId, ...tk });
  };

  return (
    <Authenticated>
      <Head>
        <title>
          Editar {ticket?.title} | {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
      </Head>

      <AppGrid>
        <Sidebar gridArea="sidebar" />
        <Header title="Editar Ticket" gridArea="header" />
        <TicketForm
          gridArea="content"
          buttonText="Editar ticket"
          defaultValues={ticket}
          ticket={ticket}
          attachments={attachments}
          handleDeleteAttachment={handleDeleteAttachment}
          isDeletingAttachment={isDeletingAttachments}
          isLoading={isUpdating}
          onImageUploaded={handleImageUploaded}
          ticketFormSubmit={updateTicketFormSubmit}
        />
      </AppGrid>
    </Authenticated>
  );
};

export default UpdateTicket;
