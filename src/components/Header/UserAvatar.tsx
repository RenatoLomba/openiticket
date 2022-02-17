import { FC } from 'react';
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';

interface UserAvatarProps {
  url?: string;
  name?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ name, url }) => {
  const { signOut } = useAuth();

  return (
    <Menu isLazy>
      <MenuButton
        p="1"
        bg="grayscale.extraLight"
        border="1px solid"
        borderColor="grayscale.divider"
        borderRadius="full"
      >
        <Avatar src={url} name={name} />
      </MenuButton>

      <MenuList>
        <MenuItem>Perfil</MenuItem>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </MenuList>
    </Menu>
  );
};
