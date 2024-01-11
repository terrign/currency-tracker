import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return { showModal, closeModal, openModal };
};

export default useModal;
