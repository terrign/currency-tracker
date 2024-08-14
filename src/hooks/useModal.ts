import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return { showModal, closeModal, openModal };
};
