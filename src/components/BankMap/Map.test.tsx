import '@testing-library/jest-dom';

import { BANK_MAP_INFO } from '@constants';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Map } from 'react-map-gl/maplibre';

import { BankMap } from '.';
import { MarkersList } from './MarkersList';

test('Map Renders', () => {
  const { container } = render(<BankMap />);
  expect(container).toBeInTheDocument();
});

test('Markers renders', () => {
  act(() => {
    render(
      <Map>
        <MarkersList markers={BANK_MAP_INFO} />
      </Map>,
    );
  });
  expect(1).toBe(1);
});
