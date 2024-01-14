import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { notificationObserver } from 'services/Observer';

import { Notification } from '.';

describe('Notification', () => {
  it('Has close button', () => {
    render(<Notification />);
    act(() => {
      notificationObserver.notify({ status: 'success', header: 'header', info: 'info' });
    });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Renders correct values', () => {
    render(<Notification />);
    act(() => {
      notificationObserver.notify({ status: 'success', header: 'header', info: 'info' });
    });
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('Closes on click', () => {
    render(<Notification />);
    act(() => {
      notificationObserver.notify({ status: 'success', header: 'header', info: 'info' });
    });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('header')).not.toBeInTheDocument();
    expect(screen.queryByText('info')).not.toBeInTheDocument();
  });
});
