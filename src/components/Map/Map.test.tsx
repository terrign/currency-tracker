import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Map } from 'react-map-gl/maplibre';

import { BANK_MAP_INFO } from '../../constants/bankMapInfo';
import CustomMap from '.';
import MapMarker from './Marker';

describe('Map', () => {
  it('Renders', () => {
    act(() => {
      const { container } = render(<CustomMap markers={BANK_MAP_INFO} />);
      waitFor(() => expect(container).toBeInTheDocument());
    });
  });
});

describe('Marker', () => {
  it('Renders', () => {
    act(() => {
      const { container } = render(
        <Map>
          <MapMarker {...BANK_MAP_INFO[0]} />
        </Map>,
      );
      waitFor(() => expect(container).toBeInTheDocument());
    });
  });
});
