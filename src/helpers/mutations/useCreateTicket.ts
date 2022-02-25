import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { ResponseError } from '../errors';
import { queryClient } from '../../libs/react-query';
import { ticketsService } from '../../services/tickets';

export const useCreateTicket = () => {
  const toast = useToast();
  const router = useRouter();

  const { mutateAsync: createTicket } = useMutation(
    ticketsService.createTicket,
    {
      onError: (error: ResponseError) => {
        toast({
          status: 'error',
          title: error.title,
          description: error.description,
        });
      },
      onSuccess: (ticket) => {
        queryClient.invalidateQueries();

        toast({
          status: 'success',
          title: 'Ticket aberto',
          description: `O ticket ${ticket.title} foi criado com sucesso`,
        });

        router.push('/tickets');
      },
    },
  );

  return { createTicket };
};
