import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { StGgMapProps } from '../../types/types';

const StGgMap = ({ lat, lng, mapContainerStyle }: StGgMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  });
  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerStyle={
          mapContainerStyle || { height: '450px', width: '100%' }
        }
        center={{ lat, lng }}
        zoom={16}
      >
        <MarkerF position={{ lat, lng }} />
      </GoogleMap>
    );
  } else {
    return <></>;
  }
};

export default StGgMap;
