import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const SidebarDivider: FC<BoxProps> = ({ ...rest }) => {
  return (
    <Box w="100%" h="1px" bg="grayscale.divider" opacity="0.1" {...rest}></Box>
  );
};

export { SidebarDivider };
