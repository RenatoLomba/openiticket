import { HStack, Icon, Image, useDisclosure } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Attachment } from '../../services/types/tickets.types';
import { AttachmentModal } from './AttachmentModal';

interface ReplyAttachmentsProps {
  attachments: Attachment[];
}

const attachmentsPerPage = 3;

export const ReplyAttachments: FC<ReplyAttachmentsProps> = ({
  attachments,
}) => {
  const [attachmentsPage, setAttachmentsPage] = useState(0);
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment>(
    attachments[0],
  );

  const { isOpen, onClose, onOpen } = useDisclosure();

  const attachmentsStart = attachmentsPage * attachmentsPerPage;
  const nextPageAttachmentsStart = (attachmentsPage + 1) * attachmentsPerPage;
  const attachmentsEnd = attachmentsStart + attachmentsPerPage;
  const nextPageAttachmentsEnd = nextPageAttachmentsStart + attachmentsPerPage;

  const attachmentsToShow = attachments.slice(attachmentsStart, attachmentsEnd);

  const hasLeftAttachments = attachmentsPage !== 0;

  const hasRightAttachments =
    attachments.slice(nextPageAttachmentsStart, nextPageAttachmentsEnd).length >
    0;

  const nextPage = () => {
    if (!hasRightAttachments) return;

    setAttachmentsPage((page) => page + 1);
  };

  const prevPage = () => {
    if (!hasLeftAttachments) return;

    setAttachmentsPage((page) => page - 1);
  };

  const onAttachmentClick = (at: Attachment) => {
    setSelectedAttachment(at);

    onOpen();
  };

  return (
    <>
      <HStack position="relative" justify="center" w="100%" mt={2}>
        <Icon
          onClick={prevPage}
          opacity={!hasLeftAttachments ? '0.5' : '1'}
          cursor={!hasLeftAttachments ? 'default' : 'pointer'}
          w={8}
          h={8}
          as={MdChevronLeft}
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
        />
        {attachmentsToShow.map((at) => (
          <Image
            cursor="pointer"
            onClick={() => onAttachmentClick(at)}
            src={at.publicURL}
            key={at.path}
            width={250}
          />
        ))}
        <Icon
          onClick={nextPage}
          opacity={!hasRightAttachments ? '0.5' : '1'}
          cursor={!hasRightAttachments ? 'default' : 'pointer'}
          w={8}
          h={8}
          as={MdChevronRight}
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
        />
      </HStack>
      <AttachmentModal
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedAttachment.publicURL}
        title={selectedAttachment.path}
      />
    </>
  );
};
