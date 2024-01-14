import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { useModal } from '../../../hooks/useModal';
import { Modal } from '.';

function TestComponent() {
  const { showModal, closeModal, openModal } = useModal();

  const onClick = () => {
    if (showModal) {
      closeModal();
      return;
    }
    openModal();
  };

  return <button onClick={onClick}>{showModal ? 'On' : 'Off'}</button>;
}

describe('useModal', () => {
  it('Works as expected', async () => {
    render(<TestComponent />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('Off');
    fireEvent.click(btn);
    expect(btn).toHaveTextContent('On');
    fireEvent.click(btn);
    expect(btn).toHaveTextContent('Off');
  });
});

describe('Modal renders, fires callbacks on close', () => {
  it('Works as expected', () => {
    let value = '';
    render(
      <Modal
        onClose={() => {
          value += 'closed';
        }}
      >
        <p>text</p>
      </Modal>,
    );
    const btn = document.querySelector('button');
    fireEvent.click(btn!);
    expect(value).toBe('closed');
    fireEvent.click(screen.getByRole('alertdialog', { hidden: true }));
    expect(value).toBe('closedclosed');
  });
});
