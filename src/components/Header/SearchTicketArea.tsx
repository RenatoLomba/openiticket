import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { PriorityTypes } from '../../helpers/constants/priorities';
import { ticketsService } from '../../services/tickets';
import { Small } from '../Text/Small';
import { Strong } from '../Text/Strong';
import { Priority } from '../Tickets/Priority';

let searchTimeout: NodeJS.Timeout | null = null;

interface Tickets {
  id: number;
  title: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
  priority: PriorityTypes;
  created_at_formatted: string;
}

export const SearchTicketArea: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [showTickets, setShowTickets] = useState(false);

  const router = useRouter();

  const searchTicket = async () => {
    const searchTextTrimmed = searchText.trim();

    if (searchTimeout) clearTimeout(searchTimeout);

    if (!searchTextTrimmed) {
      setTickets([]);
      setShowTickets(false);
      return;
    }

    searchTimeout = setTimeout(async () => {
      const ticketsResponse = await ticketsService.searchTicket(searchText);

      setTickets(ticketsResponse);
      setShowTickets(true);
    }, 1500);
  };

  useEffect(() => {
    searchTicket();
  }, [searchText]);

  return (
    <Box position="relative" w="500px">
      <InputGroup borderTopRadius="2xl" bg="grayscale.border">
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<Icon as={FaSearch} color="grayscale.grayLight" />}
        />
        <Input
          onFocus={() => {
            if (tickets.length > 0) {
              setShowTickets(true);
            }
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          placeholder="Busque um ticket..."
          border="none"
          _focus={{ outline: 'none' }}
        />
      </InputGroup>
      {showTickets && (
        <VStack
          maxHeight="400px"
          overflow="auto"
          zIndex="999"
          flexDir="column"
          position="absolute"
          borderBottomRadius="2xl"
          bg="grayscale.border"
          w="100%"
          p="2"
        >
          {tickets.map((t) => (
            <HStack
              key={t.id}
              p="3"
              spacing={6}
              w="100%"
              bg="grayscale.bg"
              borderRadius="md"
            >
              <Avatar src={t.user.avatar_url} />
              <Link
                onClick={() => {
                  setShowTickets(false);
                  setSearchText('');
                  setTickets([]);
                  router.push(`/tickets/${t.id}`);
                }}
                flex="1"
              >
                <Flex flexDir="column">
                  <Strong>{t.user.full_name}</Strong>

                  <Text>{t.title}</Text>

                  <Small>{t.created_at_formatted}</Small>
                </Flex>
              </Link>
              <Priority type={t.priority} ml="auto" />
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};
