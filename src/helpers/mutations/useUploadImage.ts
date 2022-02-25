import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { ResponseError } from '../errors';
import { storageService } from '../../services/storage';
import { UploadResponse } from '../../services/types/storage.types';

interface UseUploadImageOptions {
  onSuccess?: (data: UploadResponse) => void;
}

export const useUploadImage = (options?: UseUploadImageOptions) => {
  const toast = useToast();

  const { mutateAsync: uploadImage, isLoading: isSending } = useMutation(
    storageService.uploadImage,
    {
      onSuccess: ({ path, Key }) => {
        options?.onSuccess?.({ Key, path });

        toast({
          status: 'success',
          title: 'Sucesso ao adicionar anexo',
          description: `A imagem ${path} foi adicionada aos anexos`,
        });
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

  return { uploadImage, isSending };
};
