import 'maplibre-gl/dist/maplibre-gl.css';

import { memo, PropsWithChildren } from 'react';
import { FullscreenControl, GeolocateControl, Map, NavigationControl, ScaleControl } from 'react-map-gl/maplibre';

import { INITIAL_MAP_VIEW } from './constants';
import * as styles from './styles.module.css';

function CustomMap({ children }: PropsWithChildren) {
  return (
    <section className={styles.mapContainer}>
      <Map
        initialViewState={INITIAL_MAP_VIEW}
        mapStyle="https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      >
        <GeolocateControl />
        <FullscreenControl />
        <NavigationControl showCompass={false} />
        <ScaleControl />
        {children}
      </Map>
    </section>
  );
}

export const BankMap = memo(CustomMap);
