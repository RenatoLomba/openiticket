import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  SimpleGridProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';

import { useCreateReply } from '../../helpers/mutations/useCreateReply';
import { useDeleteImages } from '../../helpers/mutations/useDeleteImages';
import { Attachment, ReplyFormatted } from '../../services/types/tickets.types';

import { Button } from '../Button';
import { Textarea } from '../Form/Textarea';
import { UploadImageButton } from '../Form/UploadImageButton';
import { Strong } from '../Text/Strong';
import { Attachments } from './Attachments';
import { ReplyAttachments } from './ReplyAttachments';

interface RepliesProps extends SimpleGridProps {
  ticket_id: number;
  replies: ReplyFormatted[];
  userIsAllowedToModify?: boolean;
}

export const Replies: FC<RepliesProps> = ({
  ticket_id,
  replies,
  userIsAllowedToModify = false,
  ...props
}) => {
  const messageBoxRef = useRef<HTMLTextAreaElement>(null);

  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState<{ message: string }>();
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const canSendMessage = message.trim().length > 0;

  const onAttachmentUploaded = async (at: Attachment) => {
    setAttachments((ats) => [at, ...ats]);
  };

  const { deleteImages, isDeleting: isDeletingAttachments } = useDeleteImages({
    onSuccess: async ({ pathsDeleted }) => {
      const newAttachments = attachments.filter(
        (prevAt) => prevAt.path !== pathsDeleted[0],
      );

      setAttachments(newAttachments);
    },
  });

  const { createReply, isCreating } = useCreateReply({
    onSuccess: async () => {
      setAttachments([]);
      setMessage('');
    },
  });

  const handleDeleteAttachment = async (at: Attachment) => {
    await deleteImages({
      bucket: at.bucket,
      pathsToDelete: [at.path],
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!canSendMessage) {
      setMessageError({ message: 'Campo deve ser preenchido!' });
      return;
    }

    await createReply({
      attachments,
      message,
      ticket_id,
    });
  };

  useEffect(() => {
    if (messageError) {
      setMessageError(undefined);
    }
  }, [message]);

  useEffect(() => {
    messageBoxRef.current?.focus();
  }, []);

  return (
    <>
      <Heading alignSelf="flex-start" as="h3" size="md">
        Respostas
      </Heading>
      <SimpleGrid {...props} gap={8} columns={2} templateColumns="1fr 2fr">
        <VStack as="form" onSubmit={handleSubmit}>
          <Textarea
            ref={messageBoxRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={messageError && { type: 'required', ...messageError }}
            label="Mensagem"
            name="message"
          />
          <HStack justify="flex-start" w="100%">
            <UploadImageButton
              isLoading={isCreating}
              onImageUploaded={onAttachmentUploaded}
              name="messages"
              bucket="messages"
            >
              Anexar
            </UploadImageButton>
            <Button
              isLoading={isCreating}
              isDisabled={!canSendMessage}
              type="submit"
              rightIcon={<Icon as={MdSend} />}
              size="sm"
              isFullWidth={false}
            >
              Enviar
            </Button>
          </HStack>
          {attachments.length > 0 && (
            <Attachments
              userIsAllowedToDelete={userIsAllowedToModify}
              attachments={attachments}
              handleDeleteAttachment={handleDeleteAttachment}
              isDeleting={isDeletingAttachments}
            />
          )}
        </VStack>

        <VStack align="flex-start" gap={5} pl={10} w="100%">
          {replies.map((reply) => {
            return (
              <Flex key={reply.id} gap={5} w="100%">
                <Avatar src={reply.user.avatar_url} />

                <Flex
                  flexDir="column"
                  w="100%"
                  p={4}
                  background="grayscale.bg"
                  borderRadius="lg"
                >
                  <Strong>{reply.user.full_name}</Strong>
                  <Text m={2}>{reply.message}</Text>
                  {reply.attachments.length > 0 && (
                    <ReplyAttachments attachments={reply.attachments} />
                  )}
                </Flex>
              </Flex>
            );
          })}
        </VStack>
      </SimpleGrid>
    </>
  );
};
