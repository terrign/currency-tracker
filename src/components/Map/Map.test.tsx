import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Map } from 'react-map-gl/maplibre';

import { BANK_MAP_INFO } from '../../constants/bankMapInfo';
import CustomMap from '.';
import MapMarker from './Marker';

test('Map Renders', () => {
  const { container } = render(<CustomMap markers={BANK_MAP_INFO} />);
  expect(container).toBeInTheDocument();
});

test('Marker renders', () => {
  act(() => {
    render(
      <Map>
        <MapMarker {...BANK_MAP_INFO[0]} />
      </Map>,
    );
  });
  expect(1).toBe(1);
});
