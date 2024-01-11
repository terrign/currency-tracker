import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Notification from '../UI/Notification';
import TimeLineForm from '.';

test('TiemLineForm submits data, shows notification', async () => {
  const submitHandler = () => {};

  act(() => {
    render(
      <>
        <Notification />
        <TimeLineForm submitHandler={submitHandler} />
      </>,
    );
  });

  await screen.findByText(/Compare currency/);

  const inputCur = screen.getByRole('searchbox', { name: 'Currency' });

  await waitFor(() => {
    act(() => {
      fireEvent.change(inputCur, { target: { value: 'pound' } });
    });
  });

  const button = await screen.findByRole('button', { name: /Pound Sterling/ });

  await waitFor(() => {
    act(() => {
      fireEvent.click(button);
    });
  });

  expect(inputCur).toHaveValue('Pound Sterling');

  const inputCompareCur = screen.getByRole('searchbox', { name: 'Compare currency' });

  await waitFor(() => {
    act(() => {
      fireEvent.change(inputCompareCur, { target: { value: 'dollar' } });
    });
  });

  const button2 = await screen.findByRole('button', { name: /US Dollar/ });

  await waitFor(() => {
    act(() => {
      fireEvent.click(button2);
    });
  });

  expect(inputCompareCur).toHaveValue('US Dollar');

  const datePicker = screen.getByLabelText('Start Date');

  await waitFor(() => {
    act(() => {
      fireEvent.change(datePicker, { target: { value: '2023-01-20' } });
    });
  });

  expect(datePicker).toHaveValue('2023-01-20');

  const randomize = screen.getByRole('button', { name: /Randomize/ });

  await waitFor(() => {
    act(() => {
      fireEvent.click(randomize);
    });
  });

  const notification = await screen.findByText(/Chart/);

  expect(notification).toBeInTheDocument();
});
