import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Notification } from 'components/UI';
import { act } from 'react-dom/test-utils';
import { timeLineDataObserver } from 'services/Observer';
import { generateRandomCurrencyHistoryData } from 'utils';

import { TimeLineUpdateModalContent } from '.';

test('Submits data, shows notification', async () => {
  const data = generateRandomCurrencyHistoryData(new Date(Date.now()));
  const onSubmit = () => {};

  let value;

  const handler = (values: { y: number[] }) => {
    // eslint-disable-next-line prefer-destructuring
    value = values.y[1];
  };
  // @ts-expect-error wrong type
  timeLineDataObserver.subscribe(handler);

  act(() => {
    render(
      <>
        <Notification />
        <TimeLineUpdateModalContent data={data} onSubmit={onSubmit} />
      </>,
    );
  });

  const date = screen.getByLabelText(/Date/);

  const open = screen.getByLabelText(/Open/);

  const high = screen.getByLabelText(/High/) as HTMLInputElement;

  const low = screen.getByLabelText(/Low/);

  const close = screen.getByLabelText(/Close/);

  expect(date).toHaveValue(data[0].x);
  expect(open).toHaveValue(String(data[0].y[0]));
  expect(high).toHaveValue(String(data[0].y[1]));
  expect(low).toHaveValue(String(data[0].y[2]));
  expect(close).toHaveValue(String(data[0].y[3]));

  await waitFor(() => {
    act(() => {
      fireEvent.change(high, { target: { value: +high.value + 1 } });
    });
  });

  await waitFor(() => {
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });

  expect(value).toBe(String(+high.value));
  // @ts-expect-error wrong type
  timeLineDataObserver.unsubscribe(handler);
});
