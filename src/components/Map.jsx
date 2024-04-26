import styles from './Map.module.css'
import {useNavigate, useSearchParams} from "react-router-dom";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  function changePosition(){
    setSearchParams({lat: 34, lng: 45})
  }
  
  const navigate = useNavigate();

    return (
        <div className={styles.mapContainer} onClick={ ()=>{navigate('form')} } >
            <h1>City </h1>;
            <span>{lat} , {lng}</span>
            <button onClick={changePosition}>Change Position</button>
        </div>
    )
}
export default Map;