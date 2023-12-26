import { createAction } from '@reduxjs/toolkit';
import { NotificationEnum, NotificationsStateType } from './stateTypes';

export const showNotification = createAction<NotificationsStateType>('showNotification');
export const hideNotification = createAction('hideNotification');

export const showErrorNotification = (title: string, message: string) => showNotification({ type: NotificationEnum.error, title, message });
export const showSuccessNotification = (title: string, message: string) => showNotification({ type: NotificationEnum.success, title, message });
