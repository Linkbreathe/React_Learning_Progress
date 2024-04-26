import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { CitiesContextProvider } from "./components/CitiesContext";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayOut from "./pages/AppLayOut";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";


const BASE_URL = "http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
    // console.log(cities)
  }, []);
  return (
    <CitiesContextProvider value={{ cities, isLoading }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayOut />}>
            <Route index element={ <Navigate replace to="cities"/> } />
            <Route
              element={<CityList  />}
            />
            <Route
              path="cities"
              element={<CityList  />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={ <CountryList />}/>
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesContextProvider>
  );
}
export default App;
