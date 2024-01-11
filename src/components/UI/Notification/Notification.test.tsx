import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { notification } from '../../../utils/Observer';
import Notification from '.';

describe('Notification', () => {
  it('Has close button', () => {
    render(<Notification />);
    act(() => {
      notification.notify({ status: 'success', header: 'header', info: 'info' });
    });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Renders correct values', () => {
    render(<Notification />);
    act(() => {
      notification.notify({ status: 'success', header: 'header', info: 'info' });
    });
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('Closes on click', () => {
    render(<Notification />);
    act(() => {
      notification.notify({ status: 'success', header: 'header', info: 'info' });
    });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('header')).not.toBeInTheDocument();
    expect(screen.queryByText('info')).not.toBeInTheDocument();
  });

  it('Expires', () => {
    render(<Notification />);
    act(() => {
      notification.notify({ status: 'success', header: 'header', info: 'info', expirationMs: 100 });
    });
    waitFor(() => {
      expect(screen.queryByText('header')).not.toBeInTheDocument();
      expect(screen.queryByText('info')).not.toBeInTheDocument();
    });
  });
});
