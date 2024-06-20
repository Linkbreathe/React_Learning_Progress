// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"


import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from '../hooks/useUrlPosition';
import DatePicker from "react-datepicker";
import Spinner from './Spinner';
import Message from './Message';
import Button from './Button'
import { useCities } from '../contexts/CitiesContext'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [emoji, setEmoji] = useState("")
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  useEffect(
    function () {
      async function fetchCityData() {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        try {
          const response = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`);
          const data = await response.json();
          if (!data.countryCode) {
            throw new Error("No country code can be found, please try again and keep your click on the continents");
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message)
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    }, [lat, lng]
  )

  function handleSumbit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    if (lat && lng) {
      const newCity = {
        cityName,
        country,
        date,
        notes,
        emoji,
        position: { lat, lng }
      };
      createCity(newCity);
      navigate("/app/cities");
    }
  }


  if (isLoadingGeocoding) return <Spinner />
  if (!lat && !lng) return <Message message="Please click on the map to add a city" />
  if (geocodingError) return <Message message={geocodingError} />


  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSumbit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={(date) => setDate(date)} selected={date} dateFormat='dd/MM/yyyy' />

      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        {/* if there is no components affect the form, the form will be submitted by default button */}
        <Button type="primary" >Add</Button>
        <Button type="back" onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }} >&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
