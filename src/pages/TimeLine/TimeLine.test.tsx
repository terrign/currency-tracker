import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import TimeLine from '.';

describe('TimeLine', () => {
  it('Renders', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <TimeLine />
        </MemoryRouter>,
      );
    });
    const elem = await screen.findByText(/Build currency rate chart/);
    expect(elem).toBeInTheDocument();
  });
});
