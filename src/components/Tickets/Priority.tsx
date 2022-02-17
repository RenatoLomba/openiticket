import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { PriorityTypes, priorities } from '../../helpers/constants/priorities';

interface PriorityProps extends BoxProps {
  type?: PriorityTypes;
}

export const Priority: FC<PriorityProps> = ({ type = 'normal', ...props }) => {
  return (
    <Box
      as="span"
      color="white"
      bg={priorities[type].color}
      py="2"
      px="4"
      borderRadius="full"
      fontWeight="bold"
      fontSize="sm"
      {...props}
    >
      {priorities[type].text}
    </Box>
  );
};
