import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { ResponseError } from '../helpers/errors';
import { ticketsService } from '../services/tickets';
import { SortTypes } from '../helpers/constants/sorters';

export const useTickets = (page: number, size: number, sortBy: SortTypes) => {
  const toast = useToast();

  return useQuery(
    ['tickets', page, size, sortBy],
    () => ticketsService.getTickets(page, size, sortBy),
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
