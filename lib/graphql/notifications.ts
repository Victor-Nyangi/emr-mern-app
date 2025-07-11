import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      message
      user
      type
      read
      createdAt
      updatedAt
    }
  }
`;

export const GET_LATEST_NOTIFICATIONS = gql`
  query GetLatestNotifications($limit: Int) {
    latestNotifications(limit: $limit) {
      id
      message
      user
      type
      read
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($message: String!, $user: ID!, $type: String) {
    createNotification(message: $message, user: $user, type: $type) {
      id
      message
      user
      type
      read
      createdAt
      updatedAt
    }
  }
`;

export const MARK_NOTIFICATION_READ = gql`
  mutation MarkNotificationRead($id: ID!) {
    markNotificationRead(id: $id) {
      id
      message
      user
      type
      read
      createdAt
      updatedAt
    }
  }
`; 