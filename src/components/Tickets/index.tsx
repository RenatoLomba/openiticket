import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertIcon,
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Spinner,
} from '@chakra-ui/react';

import { Card } from '../Card';
import { Button } from '../Button';
import { SortButton } from './SortButton';
import { TicketsTable } from './TicketsTable';

import { useTickets } from '../../hooks/useTickets';
import { sorters } from '../../helpers/constants/sorters';

export const Tickets: FC<BoxProps> = ({ ...props }) => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(sorters[0]);

  const {
    data: tickets,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useTickets(1, 5);

  return (
    <Box p="8" as="main" {...props}>
      <Card h="100%" as="section">
        <Flex w="100%">
          <Heading as="h3" size="md">
            Seus tickets
          </Heading>

          <HStack ml="auto" spacing={8}>
            {process.env.NODE_ENV === 'development' && (
              <Button
                onClick={() => refetch()}
                bg="yellow.default"
                size="sm"
                p="4"
                isLoading={isFetching || isLoading}
              >
                Refresh
              </Button>
            )}
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

        <Box mt="10">
          {isLoading ? (
            <Flex h="100%" w="100%" justify="center" align="center">
              <Spinner size="xl" color="accent.default" />
            </Flex>
          ) : isError ? (
            <Alert>
              <AlertIcon />
              Ocorreu um erro ao carregar os tickets
            </Alert>
          ) : (
            tickets && <TicketsTable tickets={tickets} />
          )}
        </Box>
      </Card>
    </Box>
  );
};
