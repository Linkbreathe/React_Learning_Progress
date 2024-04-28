import styles from "./CountryList.module.css"
import Spinner from "./Spinner"
import CountryItem from "./CountryItem"
import Message from "./Message"
import {useCities} from "../components/CitiesContext"

function CountryList() {
    const { cities,isLoading } = useCities();    
    if(cities.length==0){
        return <Message message="Add your first country by clicking up on the map" />
    }
    if(isLoading) return <Spinner/>
    const countries = cities.reduce((arr,city) => {
        if(!arr.map( (el)=>el.country ).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr;
    }, []);
    return (
        <ul className={styles.countryList} >
            {
                countries.map(country => <CountryItem key={country.id} country={country}/>)
            }
        </ul>
    )
}
export default CountryList;