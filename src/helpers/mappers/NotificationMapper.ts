import { INotification } from '../../contexts/notifications/types';
import { Notification } from '../../services/types/notifications.types';

export class NotificationMapper {
  static map(notification: Notification): INotification {
    const createdAtDate = new Date(notification.created_at);

    return {
      id: notification.id,
      message: notification.message,
      user: {
        full_name: notification.user.full_name,
        id: notification.user_id,
        avatar_url: notification.user.avatar_url,
      },
      ticket_id: notification.ticket as unknown as number,
      created_at_formatted: createdAtDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }
}
