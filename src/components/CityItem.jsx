import styles from "./CityItem.module.css";
import { Link, useParams } from "react-router-dom";
import { useCities } from "./CitiesContext"

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));

function CityItem({city}) {
    const {currentCity} = useCities();
    const {cityName, emoji, date, id, position} = city;
    console.log(position)
    return <li > 
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={
        `${styles.cityItem} ${id===currentCity.id?styles["cityItem--active"]:""}`
      }>
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <span className={styles.date}>{formatDate(date)}</span>
        <button className={styles.deleteBtn}>&times;</button>
      </Link> 
    </li>
}
export default CityItem;
