import { CloseButton } from 'components/UI/CloseButton';
import { MouseEvent, PropsWithChildren, useEffect } from 'react';

import * as styles from './styles.module.css';

export interface ModalProps extends PropsWithChildren {
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  const backGroundClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const closeButtonHandler = () => {
    onClose();
  };

  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      event.key === 'Escape' && onClose();
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, [onClose]);

  return (
    <section className={styles.modalBackground} aria-hidden onClick={backGroundClickHandler} role="alertdialog">
      <div className={styles.modal}>
        {children}
        <CloseButton onClick={closeButtonHandler} />
      </div>
    </section>
  );
}
