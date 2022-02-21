import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

import { Sizes, useSizeValue } from '../hooks/useSizeValue';

interface ButtonProps extends ChakraButtonProps {
  size?: Sizes;
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, size = 'md', bg = 'accent.default', isFullWidth = true, ...rest },
  ref,
) => {
  const paddingValue = useSizeValue({ lg: '8', md: '6', sm: '4' }, size);

  const fontSizeValue = useSizeValue({ lg: 'lg', md: 'md', sm: 'sm' }, size);

  return (
    <ChakraButton
      ref={ref}
      isFullWidth={isFullWidth}
      justifyContent="center"
      alignItems="center"
      bg={bg}
      color="white"
      p={paddingValue}
      fontWeight="semibold"
      fontSize={fontSizeValue}
      transition="all 0.2s"
      _hover={{
        bg,
        filter: 'brightness(0.9)',
      }}
      _active={{
        bg,
      }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

const Button = forwardRef(ButtonBase);

export { Button };
