import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

type CardProps = BoxProps;

const Card: FC<CardProps> = ({ children, ...rest }) => {
  return (
    <Box
      w="100%"
      bg="white"
      borderRadius="md"
      px="6"
      py="10"
      border="1px solid"
      borderColor="grayscale.divider"
      {...rest}
    >
      {children}
    </Box>
  );
};

export { Card };
