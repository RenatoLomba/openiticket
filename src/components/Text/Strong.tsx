import { FC } from 'react';
import { TextProps, Text } from '@chakra-ui/react';

export const Strong: FC<TextProps> = ({
  fontSize = 'md',
  children,
  ...props
}) => {
  return (
    <Text as="strong" fontWeight="semibold" fontSize={fontSize} {...props}>
      {children}
    </Text>
  );
};
