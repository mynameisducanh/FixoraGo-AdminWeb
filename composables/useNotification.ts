import { notification } from 'ant-design-vue';
import type { MessageResponse } from '~/types/notification';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const useNotification = () => {
  const getNotificationType = (statusCode: number): NotificationType => {
    if (statusCode >= 200 && statusCode < 300) return 'success';
    if (statusCode >= 300 && statusCode < 600) return 'error';
    return 'warning';
  };


  const appNotification = (messageResponse: MessageResponse) => {
    const type = getNotificationType(messageResponse?.statusCode);
    notification[type]({
      message: 'Thông báo',
      description: messageResponse.message,
    });
  };

  return { appNotification };
};
