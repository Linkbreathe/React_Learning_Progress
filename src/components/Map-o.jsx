import styles from './Map.module.css'
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from './CitiesContext';
import {useGeolocation} from '../hooks/useGeolocation';
import Button from "./Button"

function Map() {
  const { cities } = useCities();
  const [mapPostion, setMapPosition] = useState([40, 0]);
  const {position:geolocationPosition,isLoading:isLoadingPosition,getPosition} = useGeolocation();
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
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
    }, [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer} >
      {
      
      !geolocationPosition && (
        <Button type="position" onClick={getPosition}> {isLoadingPosition?"Loading...":"Use your current position"} </Button>
      )}  
      <MapContainer center={mapPostion} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          cities.map(city => {
            return (
              <Marker position={mapPostion} key={city.id}>
                <Popup>
                  {city.cityName}
                </Popup>
              </Marker>
            )
          })
        }
        <ChangeCenter position={mapPostion} />
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
    click:e=>navigate(`form&lat=${e.latlng.lat}&lng=${e.lating.lng}`)
  })
}

export default Map;