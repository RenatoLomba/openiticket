import { FC } from 'react';
import { TextProps, Text } from '@chakra-ui/react';

export const Small: FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text fontSize="sm" color="grayscale.grayLight" {...props}>
      {children}
    </Text>
  );
};
