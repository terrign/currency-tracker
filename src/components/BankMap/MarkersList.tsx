import { BankMapInfo } from 'models';
import { Marker } from 'react-map-gl/maplibre';

export function MarkersList({ markers }: { markers: BankMapInfo[] }) {
  return (
    <>
      {markers.map((marker) => (
        <Marker latitude={Number(marker.latitude)} longitude={Number(marker.longitude)} key={marker.id} />
      ))}
    </>
  );
}
