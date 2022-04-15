import { FC } from 'react';
import {
  Avatar,
  HStack,
  Link,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Priority } from './Priority';
import { Small } from '../Text/Small';
import { Strong } from '../Text/Strong';

import { TicketResponse } from '../../services/types/tickets.types';

interface TicketsTableProps {
  tickets: TicketResponse[];
}

export const TicketsTable: FC<TicketsTableProps> = ({ tickets }) => {
  return (
    <Table>
      <Thead>
        <Tr fontSize="md" fontWeight="bold" color="grayscale.gray">
          <Td>Detalhes</Td>
          <Td>Solicitante</Td>
          <Td>Data de abertura</Td>
          <Td>Prioridade</Td>
        </Tr>
      </Thead>

      <Tbody>
        {tickets.map((ticket) => (
          <Tr
            _hover={{ bg: ticket.is_resolved ? 'gray.50' : 'accent.bg' }}
            key={ticket.id}
            opacity={ticket.is_resolved ? 0.5 : 1}
            background={ticket.is_resolved ? 'gray.50' : ''}
          >
            <Td>
              <HStack spacing={8}>
                <Avatar
                  name={ticket.user.full_name}
                  src={ticket.user.avatar_url}
                />

                <VStack align="flex-start">
                  <NextLink href={`/tickets/${ticket.id}`} passHref>
                    <Link
                      _hover={{
                        textDecoration: ticket.is_resolved
                          ? 'none'
                          : 'underline',
                      }}
                    >
                      <Strong
                        textDecorationLine={
                          ticket.is_resolved ? 'line-through' : ''
                        }
                      >
                        {ticket.title}
                      </Strong>
                    </Link>
                  </NextLink>
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
