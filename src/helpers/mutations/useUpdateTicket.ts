import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { queryClient } from '../../libs/react-query';
import { ticketsService } from '../../services/tickets';
import { ResponseError } from '../errors';

export const useUpdateTicket = () => {
  const toast = useToast();

  const { mutateAsync: updateTicket, isLoading: isUpdating } = useMutation(
    ticketsService.updateTicket,
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
          title: 'Ticket atualizado',
          description: `O ticket ${ticket.title} foi atualizado com sucesso`,
        });
      },
    },
  );

  return { updateTicket, isUpdating };
};
