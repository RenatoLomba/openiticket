import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

import { Card } from '../Card';
import { Button } from '../Button';
import { Priority } from './Priority';
import { Small } from '../Text/Small';
import { Strong } from '../Text/Strong';
import { SortButton } from './SortButton';

import { sorters } from '../../helpers/constants/sorters';

export const Tickets: FC<BoxProps> = ({ ...props }) => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(sorters[0]);

  return (
    <Box p="8" as="main" {...props}>
      <Card h="100%" as="section">
        <Flex w="100%">
          <Heading as="h3" size="md">
            Seus tickets
          </Heading>

          <HStack ml="auto" spacing={8}>
            <Button
              onClick={() => router.push('/tickets/create')}
              size="sm"
              p="4"
            >
              Criar ticket
            </Button>
            <SortButton sortBy={sortBy} changeSortBy={setSortBy} />
          </HStack>
        </Flex>

        <Table mt="10">
          <Thead>
            <Tr fontSize="md" fontWeight="bold" color="grayscale.gray">
              <Td>Detalhes</Td>
              <Td>Solicitante</Td>
              <Td>Data</Td>
              <Td>Prioridade</Td>
            </Tr>
          </Thead>

          <Tbody>
            <Tr _hover={{ bg: 'accent.bg' }}>
              <Td>
                <HStack spacing={8}>
                  <Avatar
                    name="Renato Lomba"
                    src="https://github.com/RenatoLomba.png"
                  />

                  <VStack align="flex-start">
                    <Strong>Não consigo ligar a máquina</Strong>
                    <Small>Atualizado a 1 dia atrás</Small>
                  </VStack>
                </HStack>
              </Td>
              <Td>
                <VStack align="flex-start">
                  <Strong>Tom Cruise</Strong>
                  <Small>em 24/05/2019</Small>
                </VStack>
              </Td>
              <Td>
                <VStack align="flex-start">
                  <Strong>Maio 26, 2019</Strong>
                  <Small>6:30 PM</Small>
                </VStack>
              </Td>
              <Td>
                <Priority type="high" />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Card>
    </Box>
  );
};
