export enum NotificationEnum {
  error = 'error',
  success = 'success'
}

export type NotificationsStateType = {
  type: NotificationEnum | null;
  title: string;
  message: string;
};
