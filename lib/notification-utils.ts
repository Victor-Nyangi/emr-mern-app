import { client } from './apollo-client';
import { CREATE_NOTIFICATION } from './graphql/notifications';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface CreateNotificationParams {
  message: string;
  userId: string;
  type?: NotificationType;
}

export const createNotification = async ({ message, userId, type = 'info' }: CreateNotificationParams) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_NOTIFICATION,
      variables: {
        message,
        user: userId,
        type,
      },
    });
    return data.createNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const createInfoNotification = (message: string, userId: string) => 
  createNotification({ message, userId, type: 'info' });

export const createSuccessNotification = (message: string, userId: string) => 
  createNotification({ message, userId, type: 'success' });

export const createWarningNotification = (message: string, userId: string) => 
  createNotification({ message, userId, type: 'warning' });

export const createErrorNotification = (message: string, userId: string) => 
  createNotification({ message, userId, type: 'error' }); 