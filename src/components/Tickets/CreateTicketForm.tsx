import { FC, useState } from 'react';
import {
  Box,
  BoxProps,
  Heading,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
import { storageService } from '../../services/storage';
import { useCreateTicket } from '../../hooks/useTickets';
import { createTicketFormSchema } from '../../helpers/yup';

interface Attachment {
  publicURL: string;
  bucket: string;
  path: string;
}

interface CreateTicketFormData {
  title: string;
  description: string;
  priority: PriorityTypes;
}

export const CreateTicketForm: FC<BoxProps> = ({ ...props }) => {
  const toast = useToast();
  const { mutateAsync: createTicket } = useCreateTicket();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketFormData>({
    resolver: yupResolver(createTicketFormSchema),
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const createTicketFormSubmit = async (data: CreateTicketFormData) => {
    await createTicket({ ...data, attachments });
  };

  const onAttachmentUploaded = (attachment: Attachment) => {
    setAttachments((prev) => [attachment, ...prev]);

    toast({
      status: 'success',
      title: 'Sucesso ao adicionar anexo',
      description: `A imagem ${attachment.path} foi adicionada aos anexos`,
    });
  };

  const handleDeleteAttachment = async (at: Attachment) => {
    const { error } = await storageService.deleteImages({
      bucket: at.bucket,
      pathsToDelete: [at.path],
    });

    if (error) {
      toast({
        status: 'error',
        title: error.title,
        description: error.description,
      });
      return;
    }

    setAttachments((prev) => prev.filter((prevAt) => prevAt.path !== at.path));
  };

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
            onSubmit={handleSubmit(createTicketFormSubmit)}
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

            <Button type="submit" isLoading={isSubmitting} bg="green.default">
              Criar ticket
            </Button>
          </VStack>

          <Box>
            <UploadImageButton
              name="attachments"
              bucket="attachments"
              onImageUploaded={onAttachmentUploaded}
              isLoading={isSubmitting}
            >
              Anexar
            </UploadImageButton>

            <Attachments
              attachments={attachments}
              handleDeleteAttachment={handleDeleteAttachment}
            />
          </Box>
        </SimpleGrid>
      </Card>
    </Box>
  );
};
