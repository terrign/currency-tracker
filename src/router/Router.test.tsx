import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Router from '.';

describe('Router', () => {
  it('Renders', async () => {
    await waitFor(() => {
      act(() => {
        render(<Router />);
      });
    });

    expect(1).toBe(1);
  });
});
