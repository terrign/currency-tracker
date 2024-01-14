import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { generateRandomCurrencyHistoryData } from '../../../utils/generateRandomCurrencyHistoryData';
import { dayData } from '../../../utils/Observer';
import { Notification } from '../../UI';
import { TimeLineUpdateModalContent } from '.';

test('Submits data, shows notification', async () => {
  const data = generateRandomCurrencyHistoryData(new Date(Date.now()));
  const onSubmit = () => {};

  let value;

  const handler = (values: { y: number[] }) => {
    // eslint-disable-next-line prefer-destructuring
    value = values.y[0];
  };

  dayData.subscribe(handler);

  act(() => {
    render(
      <>
        <Notification />
        <TimeLineUpdateModalContent data={data} onSubmit={onSubmit} />
      </>,
    );
  });

  const date = screen.getByLabelText(/Date/);

  const open = screen.getByLabelText(/Open/) as HTMLInputElement;

  const high = screen.getByLabelText(/High/);

  const low = screen.getByLabelText(/Low/);

  const close = screen.getByLabelText(/Close/);

  expect(date).toHaveValue(data[0].x);
  expect(open).toHaveValue(data[0].y[0]);
  expect(high).toHaveValue(data[0].y[1]);
  expect(low).toHaveValue(data[0].y[2]);
  expect(close).toHaveValue(data[0].y[3]);

  await waitFor(() => {
    act(() => {
      fireEvent.change(open, { target: { value: +open.value + 1 } });
    });
  });

  await waitFor(() => {
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });

  expect(value).toBe(String(+open.value));

  dayData.unsubscribe(handler);
});
