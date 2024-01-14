import 'maplibre-gl/dist/maplibre-gl.css';

import { memo, PropsWithChildren } from 'react';
import { FullscreenControl, GeolocateControl, Map, NavigationControl, ScaleControl } from 'react-map-gl/maplibre';

import { INITIAL_MAP_VIEW } from './constants';

function CustomMap({ children }: PropsWithChildren) {
  return (
    <Map
      initialViewState={INITIAL_MAP_VIEW}
      style={{ height: 500, marginTop: '1rem' }}
      mapStyle="https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
    >
      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl showCompass={false} />
      <ScaleControl />
      {children}
    </Map>
  );
}

export const BankMap = memo(CustomMap);
