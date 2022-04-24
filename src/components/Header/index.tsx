import { FC } from 'react';
import { FaBell } from 'react-icons/fa';
import { Box, BoxProps, Flex, Heading, HStack } from '@chakra-ui/react';

import { Strong } from '../Text/Strong';
import { UserAvatar } from './UserAvatar';
import { HeaderButton } from './HeaderButton';
import { HeaderDivider } from './HeaderDivider';

import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { SearchTicketArea } from './SearchTicketArea';

interface HeaderProps extends BoxProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title, ...rest }) => {
  const { user } = useAuth();
  const { openNotificationsDrawer, notificationsVisualized } =
    useNotifications();

  return (
    <Box as="header" py="5" px="8" {...rest}>
      <Flex as="nav" justify="space-between" align="center" h="100%">
        <Heading as="h2" size="lg">
          {title}
        </Heading>

        <HStack spacing={8}>
          <HStack>
            <SearchTicketArea />
            <HeaderButton
              showBadge={!notificationsVisualized}
              icon={FaBell}
              onClick={openNotificationsDrawer}
            />
          </HStack>

          <HeaderDivider />

          <HStack spacing={4}>
            <Strong>{user?.full_name}</Strong>

            <UserAvatar url={user?.avatar_url} name={user?.full_name} />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export { Header };
