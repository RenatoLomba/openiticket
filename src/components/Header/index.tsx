import { FC } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { Box, BoxProps, Flex, Heading, HStack } from '@chakra-ui/react';

import { Strong } from '../Text/Strong';
import { UserAvatar } from './UserAvatar';
import { HeaderButton } from './HeaderButton';
import { HeaderDivider } from './HeaderDivider';

import { useAuth } from '../../hooks/useAuth';

interface HeaderProps extends BoxProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title, ...rest }) => {
  const { user } = useAuth();

  return (
    <Box as="header" py="5" px="8" {...rest}>
      <Flex as="nav" justify="space-between" align="center" h="100%">
        <Heading as="h2" size="lg">
          {title}
        </Heading>

        <HStack spacing={8}>
          <HStack>
            <HeaderButton icon={FaSearch} />
            <HeaderButton icon={FaBell} />
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
