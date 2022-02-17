import { FC } from 'react';
import NextLink from 'next/link';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import { HStack, Icon as ChakraIcon, Text, Link } from '@chakra-ui/react';

interface ActiveLinkProps {
  text: string;
  href: string;
  icon: IconType;
}

const ActiveLink: FC<ActiveLinkProps> = ({ href, icon: Icon, text }) => {
  const router = useRouter();

  const isActive = router.asPath === href;

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecor: isActive ? 'none' : 'underline',
        }}
        bg={isActive ? 'sidebar.light' : ''}
        borderLeft={isActive ? '3px solid' : ''}
        borderColor="accent.light"
      >
        <HStack align="center" py="4" px="8" spacing={6}>
          <ChakraIcon
            filter={!isActive ? 'brightness(0.6)' : ''}
            as={Icon}
            color={!isActive ? 'grayscale.gray' : 'accent.light'}
          />
          <Text
            color={!isActive ? 'sidebar.gray' : 'accent.light'}
            fontSize="md"
          >
            {text}
          </Text>
        </HStack>
      </Link>
    </NextLink>
  );
};

export { ActiveLink };
