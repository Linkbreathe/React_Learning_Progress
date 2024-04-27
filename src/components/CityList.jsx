import styles from "./CityList.module.css"
import Spinner from "./Spinner"
import CityItem from "./CityItem"
import Message from "./Message"
import {useCities} from "./CitiesContext"
function CityList() {
    const { cities,isLoading } = useCities();
    if(cities.length==0){
        return <Message message="Add your first city by clicking up on the map" />
    }
    if(isLoading) return <Spinner/>
    return (
        <ul className={styles.cityList} >
            {
                cities.map(city => <CityItem key={city.id} city={city}/>)
            }
        </ul>
    )
}
export default CityList;