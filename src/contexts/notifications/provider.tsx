import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure, useToast, Link } from '@chakra-ui/react';

import { INotification } from './types';
import { NotificationsContext } from '.';
import { useAuth } from '../../hooks/useAuth';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { notificationsService } from '../../services/notifications';
import { NotificationMapper } from '../../helpers/mappers/NotificationMapper';
import { NotificationsDrawer } from '../../components/Drawer/NotificationsDrawer';

export const NotificationsProvider: FC = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notificationsVisualized, setNotificationsVisualized] = useState(false);

  const { user } = useAuth();
  const userIsAdmin = useIsAdmin();
  const {
    isOpen: notificationsDrawerIsOpen,
    onClose: closeNotificationsDrawer,
    onOpen: openNotificationsDrawer,
  } = useDisclosure();
  const notificationsToast = useToast({
    status: 'warning',
    position: 'top-right',
    containerStyle: {
      width: '400px',
      maxWidth: '100%',
      height: '300px',
      maxHeight: '100%',
    },
    isClosable: true,
    variant: 'top-accent',
  });
  const router = useRouter();

  const getUserNotifications = async () => {
    const { getAdminNotifications, getUserNotifications } =
      notificationsService;

    const getNotificationsService = userIsAdmin
      ? getAdminNotifications
      : getUserNotifications;

    const userNotifications = await getNotificationsService(user?.id as string);

    const notificationsFormatted: INotification[] = userNotifications.map((n) =>
      NotificationMapper.map(n),
    );

    setNotifications(notificationsFormatted);
  };

  useEffect(() => {
    if (user && user.roles && notifications.length > 0 && router) {
      const notificationsSubscription =
        notificationsService.subscribeNotifications((n) => {
          if (
            n.user_id !== user.id &&
            (n.ticket.user_id === user.id || userIsAdmin)
          ) {
            const notificationFormatted = NotificationMapper.map(n);

            const newNotifications = [...notifications];
            newNotifications.pop();
            newNotifications.unshift(notificationFormatted);

            setNotifications(newNotifications);
            setNotificationsVisualized(false);

            notificationsToast({
              title: (
                <>
                  {n.user.full_name} disse em{' '}
                  <Link
                    onClick={() => {
                      router.push(`/tickets/${n.ticket.id}`);
                      notificationsToast.closeAll();
                    }}
                  >
                    {`"${n.ticket.title}": `}
                  </Link>
                </>
              ),
              description: n.message,
            });
          }
        });

      return () => {
        notificationsSubscription.unsubscribe();
      };
    }
  }, [user, notifications, router]);

  useEffect(() => {
    if (notificationsDrawerIsOpen) {
      setNotificationsVisualized(true);
    }
  }, [notificationsDrawerIsOpen]);

  useEffect(() => {
    if (user && notifications.length === 0) {
      getUserNotifications();
    }
  }, [user]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        closeNotificationsDrawer,
        notificationsDrawerIsOpen,
        openNotificationsDrawer,
        notificationsVisualized,
        setNotificationsVisualized,
      }}
    >
      {children}

      <NotificationsDrawer />
    </NotificationsContext.Provider>
  );
};
