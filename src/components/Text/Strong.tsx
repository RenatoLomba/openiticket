import { FC } from 'react';
import { TextProps, Text } from '@chakra-ui/react';

export const Strong: FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text fontWeight="semibold" fontSize="md" {...props}>
      {children}
    </Text>
  );
};
