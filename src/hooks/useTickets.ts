import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from 'react-query';

import { ResponseError } from '../helpers/errors';
import { queryClient } from '../libs/react-query';
import { ticketsService } from '../services/tickets';

export const useTickets = (page: number, size: number) => {
  const toast = useToast();

  return useQuery(
    ['tickets', page, size],
    () => ticketsService.getTickets(page, size),
    {
      staleTime: 1000 * 60,
      onError: (error: ResponseError) => {
        toast({
          status: 'error',
          title: error.title,
          description: error.description,
        });
      },
    },
  );
};

export const useCreateTicket = () => {
  const toast = useToast();
  const router = useRouter();

  return useMutation(ticketsService.createTicket, {
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
  });
};
