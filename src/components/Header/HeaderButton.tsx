import { FC } from 'react';
import { IconType } from 'react-icons';
import { Button, ButtonProps, Icon as ChakraIcon } from '@chakra-ui/react';

interface HeaderButtonProps extends ButtonProps {
  icon: IconType;
}

const HeaderButton: FC<HeaderButtonProps> = ({ icon: Icon, ...rest }) => {
  return (
    <Button
      borderRadius="full"
      bg="grayscale.border"
      color="grayscale.grayLight"
      transition="0.2s ease"
      _hover={{ bg: 'grayscale.border', filter: 'brightness(0.9)' }}
      _active={{ bg: 'grayscale.border' }}
      {...rest}
    >
      <ChakraIcon as={Icon} />
    </Button>
  );
};

export { HeaderButton };
