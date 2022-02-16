import { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps;

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <ChakraButton
      w="100%"
      justifyContent="center"
      alignItems="center"
      bg="accent.default"
      color="white"
      p="6"
      fontWeight="semibold"
      fontSize="sm"
      transition="filter 0.2s"
      _hover={{
        bg: 'accent.default',
        filter: 'brightness(0.9)',
      }}
      _active={{
        bg: 'accent.default',
        filter: 'brightness(1.1)',
      }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export { Button };
