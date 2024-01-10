import { Marker } from 'react-map-gl/maplibre';

import { BankMapInfo } from '../../constants/bankMapInfo';

function MapMarker({ latitude, longitude }: BankMapInfo) {
  return <Marker latitude={+latitude} longitude={+longitude} />;
}
export default MapMarker;
