import { FC } from 'react';

import { Box, BoxProps, Flex, Heading } from '@chakra-ui/react';
import {
  FaTicketAlt,
  FaStickyNote,
  FaChartPie,
  FaStar,
  FaCog,
} from 'react-icons/fa';

import { ActiveLink } from './ActiveLink';
import { SidebarDivider } from './SidebarDivider';
import { useIsAdmin } from '../../hooks/useIsAdmin';

export const Sidebar: FC<BoxProps> = ({ ...rest }) => {
  const userIsAdmin = useIsAdmin();

  return (
    <Box bg="sidebar.bg" {...rest} as="aside">
      <Heading
        as="h3"
        size="md"
        color="sidebar.gray"
        textAlign="center"
        mt="10"
      >
        OpenITicket
      </Heading>

      <Flex flexDir="column" mt="24">
        {userIsAdmin && (
          <ActiveLink href="/dashboard" text="Dashboard" icon={FaChartPie} />
        )}
        <ActiveLink href="/tickets" text="Tickets" icon={FaTicketAlt} />
        <ActiveLink
          href="/tickets/create"
          text="Cadastrar"
          icon={FaStickyNote}
        />
        {!userIsAdmin && (
          <ActiveLink href="/rating" text="Avalie" icon={FaStar} />
        )}

        <SidebarDivider my="4" />

        <ActiveLink href="/settings" text="Configurações" icon={FaCog} />
      </Flex>
    </Box>
  );
};
