import styles from "./CityList.module.css"
import Spinner from "./Spinner"
import CityItem from "./CityItem"
import Message from "./Message"
function CityList({ cities,isLoading }) {
    console.log(cities)
    if(cities.length==0){
        return <Message message="Add your first city by clicking up on the map" />
    }
    if(isLoading) return <Spinner/>
    return (
        <ul className={styles.CityList} >
            {
                cities.map(city => <CityItem key={city.id} city={city}/>)
            }
        </ul>
    )
}
export default CityList;