import { FC } from 'react';
import {
  Avatar,
  HStack,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

import { Priority } from './Priority';
import { Small } from '../Text/Small';
import { Strong } from '../Text/Strong';

import { PriorityTypes } from '../../helpers/constants/priorities';

interface Ticket {
  id: number;
  title: string;
  priority: PriorityTypes;
  updated_at: string;
  created_at_date: string;
  created_at_hour: string;
  user: {
    full_name: string;
    avatar_url: string;
    created_at: string;
  };
}

interface TicketsTableProps {
  tickets: Ticket[];
}

export const TicketsTable: FC<TicketsTableProps> = ({ tickets }) => {
  return (
    <Table>
      <Thead>
        <Tr fontSize="md" fontWeight="bold" color="grayscale.gray">
          <Td>Detalhes</Td>
          <Td>Solicitante</Td>
          <Td>Data</Td>
          <Td>Prioridade</Td>
        </Tr>
      </Thead>

      <Tbody>
        {tickets.map((ticket) => (
          <Tr _hover={{ bg: 'accent.bg' }} key={ticket.id}>
            <Td>
              <HStack spacing={8}>
                <Avatar
                  name={ticket.user.full_name}
                  src={ticket.user.avatar_url}
                />

                <VStack align="flex-start">
                  <Strong>{ticket.title}</Strong>
                  <Small>{ticket.updated_at}</Small>
                </VStack>
              </HStack>
            </Td>
            <Td>
              <VStack align="flex-start">
                <Strong>{ticket.user.full_name}</Strong>
                <Small>em {ticket.user.created_at}</Small>
              </VStack>
            </Td>
            <Td>
              <VStack align="flex-start">
                <Strong>{ticket.created_at_date}</Strong>
                <Small>{ticket.created_at_hour}</Small>
              </VStack>
            </Td>
            <Td>
              <Priority type={ticket.priority} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
