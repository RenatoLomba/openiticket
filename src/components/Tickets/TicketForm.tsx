import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  BoxProps,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Card } from '../Card';
import { Button } from '../Button';
import { Attachments } from './Attachments';

import { Input } from '../Form/Input';
import { Textarea } from '../Form/Textarea';
import { SelectBox } from '../Form/SelectBox';
import { UploadImageButton } from '../Form/UploadImageButton';

import {
  prioritiesList,
  PriorityTypes,
} from '../../helpers/constants/priorities';
import { ticketFormSchema } from '../../helpers/yup';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { useAuth } from '../../hooks/useAuth';
import { Replies } from './Replies';
import { GetTicketResponse } from '../../services/types/tickets.types';
import { useResolveTicket } from '../../helpers/mutations/useResolveTicket';
import { Strong } from '../Text/Strong';

interface Attachment {
  publicURL: string;
  bucket: string;
  path: string;
}

export interface TicketFormData {
  title: string;
  description: string;
  priority: PriorityTypes;
}

interface TicketFormProps extends BoxProps {
  isLoading?: boolean;
  buttonText?: string;
  attachments: Attachment[];
  isDeletingAttachment: boolean;
  defaultValues?: TicketFormData;
  ticketFormSubmit: (data: TicketFormData) => Promise<void>;
  handleDeleteAttachment: (at: Attachment) => Promise<void>;
  onImageUploaded?: (image: Attachment) => void;
  ticket?: GetTicketResponse;
}

export const TicketForm = ({
  isLoading = false,
  buttonText = 'Criar ticket',
  defaultValues,
  attachments,
  onImageUploaded,
  ticketFormSubmit,
  isDeletingAttachment,
  handleDeleteAttachment,
  ticket,
  ...props
}: TicketFormProps) => {
  const { user } = useAuth();
  const userIsAdmin = useIsAdmin();
  const userOwnerId = ticket?.user_id;

  const userIsAllowedToModify = useMemo(() => {
    let allow = true;

    if (!user) {
      allow = false;
    }

    if (userOwnerId && user) {
      allow = user.id === userOwnerId;
    }

    if (ticket?.is_resolved) {
      allow = false;
    }

    return allow;
  }, [user, userOwnerId]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormData>({
    resolver: yupResolver(ticketFormSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  const { resolveTicket, isLoading: isResolving } = useResolveTicket();

  const onResolveButtonClick = async () => {
    if (!userIsAdmin || !ticket) return;

    await resolveTicket(ticket.id);
  };

  const ticketIsResolvedAndHasNoReplies =
    ticket?.is_resolved && ticket?.replies.length === 0;

  return (
    <Box p="8" as="main" {...props} overflow="hidden">
      <Card h="100%" as="section" overflow="auto">
        {!ticket && (
          <Heading as="h3" size="md">
            Coloque as informações essenciais do Ticket
          </Heading>
        )}

        {ticket && (
          <Flex align="center" gap={5} w="100%">
            <Avatar src={ticket.user.avatar_url} />
            <Text>{ticket.user.full_name}</Text>

            {userIsAdmin && !ticket.is_resolved && (
              <Button
                marginLeft="auto"
                isFullWidth={false}
                onClick={onResolveButtonClick}
                isLoading={isResolving}
              >
                Finalizar ticket
              </Button>
            )}

            {ticket.is_resolved && (
              <Text marginLeft="auto" fontSize="xl">
                Finalizado em{' '}
                <Strong fontSize="xl">{ticket.resolved_at_date}</Strong> às{' '}
                <Strong fontSize="xl">{ticket.resolved_at_hour}</Strong>
              </Text>
            )}
          </Flex>
        )}

        <SimpleGrid mt="5" gap={8} columns={2} templateColumns="1fr 2fr">
          <VStack
            maxWidth="380px"
            w="100%"
            as="form"
            onSubmit={handleSubmit(ticketFormSubmit)}
            mt="8"
            spacing={6}
          >
            <Input
              {...register('title')}
              error={errors.title}
              isDisabled={!userIsAllowedToModify}
              name="title"
              label="Título"
              placeholder="Digite o título"
            />

            <Textarea
              {...register('description')}
              error={errors.description}
              isDisabled={!userIsAllowedToModify}
              name="description"
              label="Descrição"
              placeholder="Descreva o seu problema"
            />

            <SelectBox
              {...register('priority')}
              error={errors.priority}
              isDisabled={!userIsAllowedToModify}
              name="priority"
              label="Prioridade"
              options={prioritiesList}
              defaultValue="normal"
            />

            {userIsAllowedToModify && (
              <Button
                type="submit"
                isLoading={isSubmitting || isLoading}
                bg="green.default"
              >
                {buttonText}
              </Button>
            )}
          </VStack>

          <Box>
            {userIsAllowedToModify && (
              <UploadImageButton
                name="attachments"
                bucket="attachments"
                onImageUploaded={onImageUploaded}
                isLoading={isSubmitting || isLoading}
              >
                Anexar
              </UploadImageButton>
            )}

            <Attachments
              isDeleting={isDeletingAttachment}
              isLoading={isLoading}
              attachments={attachments}
              handleDeleteAttachment={handleDeleteAttachment}
              userIsAllowedToDelete={userIsAllowedToModify}
            />
          </Box>

          {(userIsAdmin || userIsAllowedToModify) &&
            ticket &&
            !ticketIsResolvedAndHasNoReplies && (
              <Replies
                ticket={ticket}
                replies={ticket.replies}
                userIsAllowedToModify={userIsAdmin || userIsAllowedToModify}
                gridColumn="span 2"
                ticket_id={ticket.id}
              />
            )}
        </SimpleGrid>
      </Card>
    </Box>
  );
};
