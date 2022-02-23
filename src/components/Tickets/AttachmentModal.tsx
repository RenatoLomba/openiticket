import { FC } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Image,
} from '@chakra-ui/react';

import { Button } from '../Button';

interface AttachmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imgUrl: string;
}

export const AttachmentModal: FC<AttachmentModalProps> = ({
  imgUrl,
  title,
  isOpen,
  onClose,
  ...rest
}) => {
  return (
    <Modal onClose={onClose} size="6xl" isOpen={isOpen} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Image mx="auto" src={imgUrl} alt={title} />
        </ModalBody>

        <ModalFooter>
          <Button isFullWidth={false} onClick={onClose} size="md">
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
