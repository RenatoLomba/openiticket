import { ResponseError } from '../helpers/errors';
import { supabaseClient } from '../libs/supabase';
import { Notification } from './types/notifications.types';
import { Ticket } from './types/tickets.types';

const notificationsMaxRange = 5;

export const notificationsService = {
  async getUserNotifications(user_id: string) {
    const { data, error } = await supabaseClient
      .from<Notification>('notifications')
      .select('*, tickets!inner(*)')
      .eq('tickets.user_id' as keyof Notification, user_id)
      .not('user_id', 'eq', user_id)
      .order('created_at', { ascending: false })
      .range(0, notificationsMaxRange);

    if (!data || error) {
      throw new ResponseError({
        code: 500,
        title: error?.message,
        description: error?.details,
      });
    }

    return data;
  },

  async getAdminNotifications(admin_id: string) {
    const { data, error } = await supabaseClient
      .from<Notification>('notifications')
      .select('*')
      .not('user_id', 'eq', admin_id)
      .order('created_at', { ascending: false })
      .range(0, notificationsMaxRange);

    if (!data || error) {
      throw new ResponseError({
        code: 500,
        title: error?.message,
        description: error?.details,
      });
    }

    return data;
  },

  subscribeNotifications(onNewNotification: (n: Notification) => void) {
    const notificationsSubscription = supabaseClient
      .from<Notification>('notifications')
      .on('INSERT', async (payload) => {
        const { data } = await supabaseClient
          .from<Ticket>('tickets')
          .select('*')
          .eq('id', payload.new.ticket as unknown as number);

        const newNotification = {
          ...payload.new,
          ticket: data?.[0] as Ticket,
        };

        onNewNotification(newNotification);
      })
      .subscribe();

    return notificationsSubscription;
  },
};
