import { FC } from 'react';
import { IconType } from 'react-icons';
import { Box, Button, ButtonProps, Icon as ChakraIcon } from '@chakra-ui/react';

interface HeaderButtonProps extends ButtonProps {
  icon: IconType;
  showBadge?: boolean;
}

const HeaderButton: FC<HeaderButtonProps> = ({
  icon: Icon,
  showBadge = false,
  ...rest
}) => {
  return (
    <Button
      position="relative"
      borderRadius="full"
      bg="grayscale.border"
      color="grayscale.grayLight"
      transition="0.2s ease"
      _hover={{ bg: 'grayscale.border', filter: 'brightness(0.9)' }}
      _active={{ bg: 'grayscale.border' }}
      {...rest}
    >
      <ChakraIcon as={Icon} />

      {showBadge && (
        <Box
          position="absolute"
          w="10px"
          h="10px"
          bg="red.default"
          top={0}
          right={0}
          borderRadius="full"
        />
      )}
    </Button>
  );
};

export { HeaderButton };
