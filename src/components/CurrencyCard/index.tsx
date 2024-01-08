import { createPortal } from 'react-dom';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import CurrencyModalContent from '../CurrencyModalContent';
import CurrencySymbol from '../UI/CurrencySymbol';
import Modal from '../UI/Modal';
import useModal from '../UI/Modal/useModal';
import * as styles from './styles.module.css';

interface CurrencyCardProps {
  rate: string;
  iso: CurISO;
}

function CurrencyCard({ rate, iso }: CurrencyCardProps) {
  const { showModal, closeModal, openModal } = useModal();

  return (
    <>
      <div className={styles.currencyCard} aria-hidden onClick={openModal}>
        <CurrencySymbol iso={iso} />
        <div>
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

export default CurrencyCard;
