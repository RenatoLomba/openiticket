import { FaPaperclip } from 'react-icons/fa';
import { ChangeEvent, FC, useRef } from 'react';
import { FormControl, FormLabel, Icon } from '@chakra-ui/react';

import { Button } from '../Button';
import { storageService } from '../../services/storage';
import { useUploadImage } from '../../helpers/mutations/useUploadImage';

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
  const { isSending, uploadImage } = useUploadImage({
    onSuccess: ({ path }) => {
      const publicURL = storageService.getPublicURL({ bucket, path });

      const image: Image = {
        bucket,
        path,
        publicURL: publicURL as string,
      };

      if (inputRef.current) {
        inputRef.current.files = null;
      }

      onImageUploaded?.(image);
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const imageFile = event.target.files[0];

    await uploadImage({ bucket, imageFile });
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
