import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { Suspense } from "react";

import { CitiesContextProvider } from "./components/CitiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";

import CityList from "./components/CityList";
import SpinnerFullPage from "./components/SpinnerFullPage";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute"

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import AppLayOut from "./pages/AppLayOut";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
const Homepage = lazy(()=>import("./pages/Homepage"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const Product = lazy(()=>import("./pages/Product"))
const AppLayOut = lazy(()=>import("./pages/AppLayOut"))
const Login = lazy(()=>import("./pages/Login"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))




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
    <AuthProvider>
      <CitiesContextProvider value={{ cities, isLoading }}>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="app" element={
              <ProtectedRoute>
                <AppLayOut />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate replace to="cities" />} />
              <Route
                element={<CityList />}
              />
              <Route
                path="cities"
                element={<CityList />}
              />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesContextProvider>
    </AuthProvider>
  );
}
export default App;
