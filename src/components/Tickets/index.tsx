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
import { Pagination } from '../Pagination';
import { ticketsPerPageList } from '../../helpers/constants/ticketsPerPageList';

export const Tickets: FC<BoxProps> = ({ ...props }) => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(sorters[0]);
  const [ticketsPerPage, setTicketsPerPage] = useState(ticketsPerPageList[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isError, isLoading, isFetching, refetch } = useTickets(
    currentPage,
    ticketsPerPage,
    sortBy.value,
  );

  const onTicketsPerPageSelected = (ticketsQty: number) => {
    setTicketsPerPage(ticketsQty);
  };

  const onNextPageSelected = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const onPreviousPageSelected = (previousPage: number) => {
    setCurrentPage(previousPage);
  };

  return (
    <Box p="8" as="main" {...props} overflow="hidden">
      <Card
        h="100%"
        as="section"
        display="flex"
        flexDir="column"
        overflow="hidden"
      >
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
                isLoading={isFetching || isLoading}
              >
                Refresh
              </Button>
            )}
            <Button onClick={() => router.push('/tickets/create')} size="sm">
              Criar ticket
            </Button>
            <SortButton sortBy={sortBy} changeSortBy={setSortBy} />
          </HStack>
        </Flex>

        <Box mt="10" flex="1" overflow="auto">
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
            data?.tickets && <TicketsTable tickets={data.tickets} />
          )}
        </Box>

        <Pagination
          mt="10"
          ml="auto"
          fromItem={data?.fromTicket}
          toItem={data?.toTicket}
          currentPage={currentPage}
          itemsPerPage={ticketsPerPage}
          itemsPerPageList={ticketsPerPageList}
          onItemsPerPageSelected={onTicketsPerPageSelected}
          onNextPage={onNextPageSelected}
          onPreviousPage={onPreviousPageSelected}
          totalCount={data?.totalTicketsCount}
        />
      </Card>
    </Box>
  );
};
