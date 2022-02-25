import { FC, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import {
  Flex,
  Image,
  Heading,
  Box,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';

import { Button } from '../Button';
import { AlertDialog } from '../AlertDialog';
import { AttachmentModal } from './AttachmentModal';

interface Attachment {
  path: string;
  publicURL: string;
  bucket: string;
}

interface AttachmentsProps {
  attachments: Attachment[];
  isDeleting: boolean;
  handleDeleteAttachment?: (attachment: Attachment) => Promise<void>;
}

export const Attachments: FC<AttachmentsProps> = ({
  attachments,
  handleDeleteAttachment,
  isDeleting,
}) => {
  const {
    isOpen: dialogIsOpen,
    onClose: dialogOnClose,
    onOpen: dialogOnOpen,
  } = useDisclosure();

  const {
    isOpen: modalIsOpen,
    onClose: modalOnClose,
    onOpen: modalOnOpen,
  } = useDisclosure();

  const [attachmentToDelete, setAttachmentToDelete] = useState<Attachment>();
  const [attachmentToVisualize, setAttachmentToVisualize] =
    useState<Attachment>();

  const hasAttachments = attachments.length > 0;

  const handleConfirmDelete = async () => {
    await handleDeleteAttachment?.(attachmentToDelete as Attachment);
  };

  const handleAttachmentClick = (at: Attachment) => {
    setAttachmentToVisualize(at);

    modalOnOpen();
  };

  return (
    <>
      <Flex
        p="4"
        mt="8"
        h="100%"
        border="1px"
        columnGap="4"
        flexWrap="wrap"
        borderStyle="dashed"
        borderColor="grayscale.divider"
        align={hasAttachments ? 'flex-start' : 'center'}
        justify={hasAttachments ? 'flex-start' : 'center'}
      >
        {hasAttachments ? (
          attachments.map((at) => (
            <Box
              key={at.path}
              border="1px solid"
              borderColor="grayscale.divider"
              p="2"
              maxW="300px"
              w="100%"
              position="relative"
            >
              <Image
                src={at.publicURL}
                cursor="pointer"
                onClick={() => handleAttachmentClick(at)}
              />

              <Button
                bg="red.default"
                position="absolute"
                top="4"
                right="4"
                size="sm"
                isFullWidth={false}
                isLoading={isDeleting && attachmentToDelete?.path === at.path}
                onClick={() => {
                  setAttachmentToDelete(at);
                  dialogOnOpen();
                }}
              >
                <Icon as={FaTrash} />
              </Button>
            </Box>
          ))
        ) : (
          <Heading color="grayscale.grayLight">Nenhum anexo</Heading>
        )}
      </Flex>

      <AlertDialog
        isOpen={dialogIsOpen}
        onClose={dialogOnClose}
        handleConfirm={handleConfirmDelete}
        handleCancel={async () => setAttachmentToDelete(undefined)}
        header="Remover"
        body="Tem certeza que deseja remover o anexo?"
      />

      <AttachmentModal
        isOpen={modalIsOpen}
        onClose={modalOnClose}
        imgUrl={attachmentToVisualize?.publicURL || ''}
        title={attachmentToVisualize?.path || ''}
      />
    </>
  );
};
