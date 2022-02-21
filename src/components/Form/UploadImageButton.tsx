import { FaPaperclip } from 'react-icons/fa';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { FormControl, FormLabel, Icon, useToast } from '@chakra-ui/react';

import { Button } from '../Button';
import { storageService } from '../../services/storage';

interface Image {
  path: string;
  bucket: string;
  publicURL: string;
}

interface UploadImageButtonProps {
  name: string;
  bucket: string;
  onImageUploaded?: (image: Image) => void;
  isLoading?: boolean;
}

export const UploadImageButton: FC<UploadImageButtonProps> = ({
  name,
  bucket,
  onImageUploaded,
  isLoading = false,
  children,
}) => {
  const toast = useToast();
  const [isSending, setIsSending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const imageFile = event.target.files[0];

    setIsSending(true);

    const { data, error } = await storageService.uploadImage({
      bucket,
      imageFile,
    });

    setIsSending(false);

    if (error || !data) {
      toast({
        status: 'error',
        title: error?.title,
        description: error?.description,
      });
      return;
    }

    const { path } = data;
    const publicURL = storageService.getPublicURL({ bucket, path });

    const image: Image = {
      bucket,
      path,
      publicURL: publicURL as string,
    };

    onImageUploaded?.(image);

    if (inputRef.current) {
      inputRef.current.files = null;
    }
  };

  return (
    <FormControl>
      <FormLabel display="inline" htmlFor={name}>
        <Button
          isLoading={isSending || isLoading}
          onClick={handleButtonClick}
          leftIcon={<Icon as={FaPaperclip} />}
          bg="yellow.default"
          size="sm"
          isFullWidth={false}
        >
          {children}
        </Button>

        <input
          ref={inputRef}
          id={name}
          disabled={isSending || isLoading}
          name={name}
          onChange={handleUploadImage}
          type="file"
          style={{ display: 'none' }}
        />
      </FormLabel>
    </FormControl>
  );
};
