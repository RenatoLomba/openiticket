import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, BoxProps, Heading, SimpleGrid, VStack } from '@chakra-ui/react';

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
  ...props
}: TicketFormProps) => {
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

  return (
    <Box p="8" as="main" {...props} overflow="hidden">
      <Card h="100%" as="section" overflow="auto">
        <Heading as="h3" size="md">
          Coloque as informações essenciais do Ticket
        </Heading>

        <SimpleGrid mt="8" gap={8} columns={2} templateColumns="1fr 2fr">
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
              name="title"
              label="Título"
              placeholder="Digite o título"
            />

            <Textarea
              {...register('description')}
              error={errors.description}
              name="description"
              label="Descrição"
              placeholder="Descreva o seu problema"
            />

            <SelectBox
              {...register('priority')}
              error={errors.priority}
              name="priority"
              label="Prioridade"
              options={prioritiesList}
              defaultValue="normal"
            />

            <Button
              type="submit"
              isLoading={isSubmitting || isLoading}
              bg="green.default"
            >
              {buttonText}
            </Button>
          </VStack>

          <Box>
            <UploadImageButton
              name="attachments"
              bucket="attachments"
              onImageUploaded={onImageUploaded}
              isLoading={isSubmitting || isLoading}
            >
              Anexar
            </UploadImageButton>

            <Attachments
              isDeleting={isDeletingAttachment}
              isLoading={isLoading}
              attachments={attachments}
              handleDeleteAttachment={handleDeleteAttachment}
            />
          </Box>
        </SimpleGrid>
      </Card>
    </Box>
  );
};
