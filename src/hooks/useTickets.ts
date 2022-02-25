import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { ResponseError } from '../helpers/errors';
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
