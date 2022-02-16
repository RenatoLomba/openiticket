import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

const FormScreenContainer: FC = ({ children }) => {
  return (
    <Flex
      bg="sidebar.bg"
      as="main"
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      px="4"
    >
      {children}
    </Flex>
  );
};

export { FormScreenContainer };
