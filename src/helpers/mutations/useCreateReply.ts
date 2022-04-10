import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { queryClient } from '../../libs/react-query';
import { repliesService } from '../../services/replies';
import { Reply } from '../../services/types/replies.types';
import { ResponseError } from '../errors';

interface UseCreateReplyParams {
  onSuccess?: (reply: Reply) => Promise<void>;
}

export const useCreateReply = (params?: UseCreateReplyParams) => {
  const toast = useToast();

  const { mutateAsync: createReply, isLoading: isCreating } = useMutation(
    repliesService.create,
    {
      onError: (error: ResponseError) => {
        toast({
          status: 'error',
          title: error.title,
          description: error.description,
        });
      },
      onSuccess: (reply) => {
        queryClient.invalidateQueries();

        params?.onSuccess?.(reply);
      },
    },
  );

  return { createReply, isCreating };
};
