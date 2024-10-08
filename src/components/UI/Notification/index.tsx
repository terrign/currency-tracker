import { DEFAULT_NOTIFICATION_EXPIRATION_TIME } from '@constants';
import { CloseButton } from 'components/UI/CloseButton';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { notificationObserver } from 'services/Observer';
import { NotificationStatus } from 'types';

import * as styles from './styles.module.css';

export interface NotificationData {
  status: NotificationStatus;
  header: string;
  info: string;
  expirationMs?: number;
}

export function Notification() {
  const [message, setMessage] = useState('');
  const [nHeader, setNHeader] = useState('');
  const [status, setStatus] = useState(NotificationStatus.SUCCESS);
  const [expiration, setExpiration] = useState(DEFAULT_NOTIFICATION_EXPIRATION_TIME);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const closeButtonHandler = () => {
    setNotificationVisible(false);
  };

  useEffect(() => {
    const clearNotification = () => {
      if (notificationVisible) {
        setNotificationVisible(false);
        setExpiration(DEFAULT_NOTIFICATION_EXPIRATION_TIME);
      }
    };
    const id = setTimeout(clearNotification, expiration);
    return () => clearTimeout(id);
  }, [expiration, notificationVisible]);

  useEffect(() => {
    const onNotify = (data: unknown) => {
      const { info, header, status, expirationMs } = data as NotificationData;
      setMessage(info);
      setNHeader(header);
      setStatus(status);
      setNotificationVisible(true);
      if (expirationMs) {
        setExpiration(expirationMs);
      }
    };
    notificationObserver.subscribe(onNotify);
    return () => notificationObserver.unsubscribe(onNotify);
  }, []);

  return (
    notificationVisible &&
    createPortal(
      <section
        data-testid="notification"
        className={`${styles.notification} ${
          status === NotificationStatus.SUCCESS ? styles.notificationSuccess : styles.notificationError
        }`}
      >
        <h5>{nHeader}</h5>
        <p>{message}</p>
        <CloseButton onClick={closeButtonHandler} />
      </section>,
      document.body,
    )
  );
}
