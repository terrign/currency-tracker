import 'maplibre-gl/dist/maplibre-gl.css';

import { FullscreenControl, GeolocateControl, Map, NavigationControl, ScaleControl } from 'react-map-gl/maplibre';

import { BankMapInfo } from '../../constants/bankMapInfo';
import MapMarker from './Marker';

interface CustomMapProps {
  markers: BankMapInfo[];
}

function CustomMap({ markers }: CustomMapProps) {
  return (
    <Map
      initialViewState={{
        longitude: 27.559107137356758,
        latitude: 53.90334172639434,
        zoom: 10,
      }}
      attributionControl={undefined}
      style={{ height: 500, marginTop: '1rem' }}
      mapStyle="https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
    >
      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl showCompass={false} />
      <ScaleControl />
      {markers.map((mark) => (
        <MapMarker {...mark} key={mark.id} />
      ))}
    </Map>
  );
}

export default CustomMap;
