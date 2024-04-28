import styles from './Map.module.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from './CitiesContext';
import {useGeolocation} from '../hooks/useGeolocation';
import Button from "./Button"
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 15]);
  const {position:geolocationPosition,isLoading:isLoadingPosition,getPosition} = useGeolocation();
  const [ mapLat, mapLng ] = useUrlPosition();
  useEffect(
    function () {
      if (mapLat && mapLng)
        setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng]
  );
  useEffect(
    function () {
      if(geolocationPosition)
        setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
      console.log(geolocationPosition)
    }, [geolocationPosition]
  );
  cities.map(city => console.log(city))

  return (
    <div className={styles.mapContainer} >
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}> {isLoadingPosition?"Loading...":"Use your current position"} </Button>
      )}  
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          cities.map(city => {
            return (
              <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
                <Popup>
                  {city.cityName}
                </Popup>
              </Marker>
            )
          })
        }
        <ChangeCenter position={mapPosition} />
        <DetectClick/>
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click:e=>{navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)}
  })
}

export default Map;