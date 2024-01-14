import { CUR_ISO_SYMBOL_MAP } from '@constants';
import { Modal } from 'components/UI';
import { useModal } from 'hooks/useModal';
import { CurISO } from 'models';
import { createPortal } from 'react-dom';

import { CurrencyModalContent } from './CurrencyModalContent';
import { CurrencySymbol } from './CurrencySymbol';
import * as styles from './styles.module.css';

interface CurrencyCardProps {
  rate: string;
  iso: CurISO;
}

export function CurrencyCard({ rate, iso }: CurrencyCardProps) {
  const { showModal, closeModal, openModal } = useModal();

  return (
    <>
      <div className={styles.currencyCard} aria-hidden onClick={openModal}>
        <CurrencySymbol iso={iso} />
        <div className={styles.currencyCardText}>
          <p className={styles.currencyName}>{CUR_ISO_SYMBOL_MAP[iso].name}</p>
          <p className={styles.currencyRate}>{rate}</p>
        </div>
      </div>
      {showModal &&
        createPortal(
          <Modal onClose={closeModal}>
            <CurrencyModalContent iso={iso} />
          </Modal>,
          document.body,
        )}
    </>
  );
}
