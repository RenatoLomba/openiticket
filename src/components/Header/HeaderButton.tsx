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
      _hover={{ bg: 'grayscale.border' }}
      _active={{ bg: 'grayscale.border' }}
      {...rest}
    >
      <ChakraIcon as={Icon} />
    </Button>
  );
};

export { HeaderButton };
