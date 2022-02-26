import { useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { ResponseError } from '../helpers/errors';
import { ticketsService } from '../services/tickets';
import { GetTicketResponse } from '../services/types/tickets.types';

interface UseGetTicketOptions {
  onSuccess: (data: GetTicketResponse) => void;
}

export const useGetTicket = (id: number, options?: UseGetTicketOptions) => {
  const toast = useToast();

  return useQuery(['ticket', id], () => ticketsService.getTicket(id), {
    ...options,
    onError: (error: ResponseError) => {
      toast({
        status: 'error',
        title: error.title,
        description: error.description,
      });
    },
    staleTime: 1000 * 60,
  });
};
