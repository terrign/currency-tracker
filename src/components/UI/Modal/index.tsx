import { MouseEvent, PropsWithChildren } from 'react';

import * as styles from './styles.module.css';

export interface ModalProps extends PropsWithChildren {
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const backGroundClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const closeButtonHandler = () => {
    onClose();
  };

  return (
    <div className={styles.modalBackground} aria-hidden onClick={backGroundClickHandler}>
      <div className={styles.modal}>
        {children}
        <button type="button" onClick={closeButtonHandler} className={styles.closeButton}>
          {' '}
        </button>
      </div>
    </div>
  );
}

export default Modal;
