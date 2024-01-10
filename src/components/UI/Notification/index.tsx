import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { DEFAULT_NOTIFICATION_EXPIRATION_TIME } from '../../../constants/globals';
import { notification } from '../../../utils/Observer';
import * as styles from './styles.module.css';

interface NotificationData {
  status: 'error' | 'success' | 'warning';
  header: 'string';
  info: 'string';
  expirationMs?: number;
}

function Notification() {
  const [message, setMessage] = useState('');
  const [nHeader, setNHeader] = useState('');
  const [status, setStatus] = useState('success');
  const [expiration, setExpiration] = useState(DEFAULT_NOTIFICATION_EXPIRATION_TIME);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const closeButtonHandler = () => {
    setNotificationVisible(false);
  };

  const onNotify = useCallback((data: NotificationData) => {
    setMessage(data.info);
    setNHeader(data.header);
    setStatus(data.status);
    setNotificationVisible(true);
    if (data.expirationMs) {
      setExpiration(data.expirationMs);
    }
  }, []);

  const clearNotification = useCallback(() => {
    if (notificationVisible) {
      setNotificationVisible(false);
      setExpiration(DEFAULT_NOTIFICATION_EXPIRATION_TIME);
    }
  }, [notificationVisible]);

  useEffect(() => {
    const id = setTimeout(clearNotification, expiration);
    return () => clearTimeout(id);
  }, [clearNotification, expiration, notificationVisible]);

  useEffect(() => {
    notification.subscribe(onNotify);
    return notification.unsubscribe(onNotify);
  }, [onNotify]);

  return (
    notificationVisible &&
    createPortal(
      <div
        className={`${styles.notification} ${
          status === 'success' ? styles.notificationSuccess : styles.notificationError
        }`}
      >
        <h5>{nHeader}</h5>
        <p>{message}</p>
        <button type="button" onClick={closeButtonHandler} className={styles.closeButton}>
          {' '}
        </button>
      </div>,
      document.body,
    )
  );
}

export default Notification;
