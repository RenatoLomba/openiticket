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

interface Attachment {
  path: string;
  publicURL: string;
  bucket: string;
}

interface AttachmentsProps {
  attachments: Attachment[];
  handleDeleteAttachment?: (attachment: Attachment) => Promise<void>;
}

export const Attachments: FC<AttachmentsProps> = ({
  attachments,
  handleDeleteAttachment,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isDeleting, setIsDeleting] = useState(false);
  const [attachmentToDelete, setAttachmentToDelete] = useState<Attachment>();

  const hasAttachments = attachments.length > 0;

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    await handleDeleteAttachment?.(attachmentToDelete as Attachment);

    setIsDeleting(false);
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
              <Image src={at.publicURL} />

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
                  onOpen();
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
        isOpen={isOpen}
        onClose={onClose}
        handleConfirm={handleConfirmDelete}
        handleCancel={async () => setAttachmentToDelete(undefined)}
        header="Remover"
        body="Tem certeza que deseja remover o anexo?"
      />
    </>
  );
};
