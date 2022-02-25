import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { ResponseError } from '../errors';
import { storageService } from '../../services/storage';
import { DeleteImagesResponse } from '../../services/types/storage.types';

interface UseDeleteImageOptions {
  onSuccess?: (data: DeleteImagesResponse) => void;
}

export const useDeleteImages = (options?: UseDeleteImageOptions) => {
  const toast = useToast();

  const { mutateAsync: deleteImages, isLoading: isDeleting } = useMutation(
    storageService.deleteImages,
    {
      ...options,
      onError: (error: ResponseError) => {
        toast({
          status: 'error',
          title: error.title,
          description: error.description,
        });
      },
    },
  );

  return { deleteImages, isDeleting };
};
