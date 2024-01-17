import { CloseButton } from 'components/UI/CloseButton';
import { MouseEvent, PropsWithChildren } from 'react';

import * as styles from './styles.module.css';

export interface ModalProps extends PropsWithChildren {
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  const backGroundClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const closeButtonHandler = () => {
    onClose();
  };

  return (
    <section className={styles.modalBackground} aria-hidden onClick={backGroundClickHandler} role="alertdialog">
      <div className={styles.modal}>
        {children}
        <CloseButton onClick={closeButtonHandler} />
      </div>
    </section>
  );
}
