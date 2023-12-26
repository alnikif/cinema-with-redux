import React from 'react';
import { useSelector } from 'react-redux';
import { selectNotificationsState } from '../../redux/notifications/selectors';
import { NotificationEnum } from '../../redux/notifications/stateTypes';
import { NotificationError } from '../NotificationError/NotificationError';

const NotificationsManager = () => {
  const { type, title, message } = useSelector(selectNotificationsState);

  if (!type) return null;

  switch (type) {
    case NotificationEnum.error:
      return <NotificationError title={title} message={message} />;

    default:
      return null;
  }
};

export default NotificationsManager;
