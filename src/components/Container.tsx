import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const Container: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box w="100%" maxWidth={1480} mx="auto" px="6" {...rest}>
      {children}
    </Box>
  );
};

export { Container };
