import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { queryClient } from '../../libs/react-query';
import { ticketsService } from '../../services/tickets';
import { ResponseError } from '../errors';

export const useResolveTicket = () => {
  const toast = useToast();

  const { mutateAsync: resolveTicket, isLoading } = useMutation(
    ticketsService.resolveTicket,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: (error: ResponseError) => {
        toast({
          status: 'error',
          title: error.title,
          description: error.description,
        });
      },
    },
  );

  return { resolveTicket, isLoading };
};
