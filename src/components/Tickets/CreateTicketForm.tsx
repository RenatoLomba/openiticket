import { FC } from 'react';
import { Box, BoxProps, Heading, VStack } from '@chakra-ui/react';

import { Card } from '../Card';
import { Input } from '../Form/Input';
import { Textarea } from '../Form/Textarea';
import { SelectBox } from '../Form/SelectBox';
import { prioritiesList } from '../../helpers/constants/priorities';

export const CreateTicketForm: FC<BoxProps> = ({ ...props }) => {
  return (
    <Box p="8" as="main" {...props}>
      <Card h="100%" as="section">
        <Heading as="h3" size="md">
          Coloque as informações essenciais do Ticket
        </Heading>

        <VStack maxWidth="380px" w="100%" as="form" mt="8" spacing={6}>
          <Input name="title" label="Título" placeholder="Digite o título" />

          <Textarea
            name="description"
            label="Descrição"
            placeholder="Descreva o seu problema"
          />

          <SelectBox
            name="priority"
            label="Prioridade"
            options={prioritiesList}
            defaultValue="normal"
          />
        </VStack>
      </Card>
    </Box>
  );
};
