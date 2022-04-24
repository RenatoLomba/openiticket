import { FC, useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Flex,
  Avatar,
  VStack,
  Link,
} from '@chakra-ui/react';

import { useNotifications } from '../../hooks/useNotifications';
import { Button } from '../Button';
import { Strong } from '../Text/Strong';
import { Small } from '../Text/Small';
import { useRouter } from 'next/router';

export const NotificationsDrawer: FC = () => {
  const { notificationsDrawerIsOpen, closeNotificationsDrawer, notifications } =
    useNotifications();
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);

  const onNotificationClick = (ticketId: number) => {
    router.push(`/tickets/${ticketId}`);

    closeNotificationsDrawer();
  };

  return (
    <>
      <Drawer
        isOpen={notificationsDrawerIsOpen}
        placement="right"
        onClose={closeNotificationsDrawer}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notificações</DrawerHeader>

          <DrawerBody>
            <VStack align="flex-start" spacing={6}>
              {notifications.map((nt) => (
                <Link
                  key={nt.id}
                  onClick={() => onNotificationClick(nt.ticket_id)}
                >
                  <Flex w="100%" columnGap={4}>
                    <Avatar src={nt.user.avatar_url} />

                    <Flex flexDir="column">
                      <Strong>{nt.user.full_name}:</Strong>
                      <Text
                        maxWidth="200px"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        display="inline-block"
                        textOverflow="ellipsis"
                      >
                        {nt.message}
                      </Text>
                      <Small>{nt.created_at_formatted}</Small>
                    </Flex>
                  </Flex>
                </Link>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button>Ver mais</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
