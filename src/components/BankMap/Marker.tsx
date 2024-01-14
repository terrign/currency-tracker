import { Marker } from 'react-map-gl/maplibre';

import { BankMapInfo } from '../../constants/bankMapInfo';

export function MapMarker({ latitude, longitude }: BankMapInfo) {
  return <Marker latitude={+latitude} longitude={+longitude} />;
}
