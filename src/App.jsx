import React, { useEffect, useState } from "react";
import TopButton from "./components/TopButton";
import Inputs from "./components/inputs";
import TimeandLocation from "./components/TimeAndLocation";
import TempAnhDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideDrawer from "./components/SideDrawer";
import AuthButtons from "./components/AuthButtons";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const AppContent = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState({ q: "Seoul" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const getWeather = async () => {
    const message = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(message)}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    await getFormattedWeatherData({ ...query, units }).then((data) => {
      toast.success(`Weather data fetched successfully for ${capitalizeFirstLetter(message)}`);
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-violet-700";
    return weather.temp <= (units === "metric" ? 20 : 60)
      ? "from-cyan-500 to-violet-500"
      : "from-yellow-600 to-orange-700";
  };

  return (
    <div className="xl">
      <div className="relative">
        {/* Nút Đăng nhập / Đăng ký */}
        <AuthButtons />

        {/* Side Drawer */}
        {isDrawerOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-50">
            <SideDrawer
              setQuery={setQuery}
              favorites={favorites}
              setFavorites={setFavorites}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </div>
        )}

        <div className={`xl mx-auto max-w-screen-lg mt-4 py-5 px-6 sm:px-16 md:px-24 lg:px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
          {/* Nút mở Side Drawer */}
          <button
            className="absolute left-5 top-5 bg-blue-600 text-white text-2xl p-2 rounded-md"
            onClick={() => setIsDrawerOpen(true)}
          >
            ☰
          </button>

          <TopButton setQuery={setQuery} />
          <Inputs
            setQuery={setQuery}
            setUnits={setUnits}
            weather={weather}
            favorites={favorites}
            setFavorites={setFavorites}
            setShowLogin={setShowLogin} // Truyền hàm mở pop-up đăng nhập
            user={user} // Kiểm tra trạng thái đăng nhập
          />

          {weather && (
            <>
              <TimeandLocation weather={weather} />
              <TempAnhDetails weather={weather} units={units} />
              <Forecast title="3 hour-step forecast" data={weather.hourly} units={units} />
              <Forecast title="Daily forecast" data={weather.daily} units={units} />
            </>
          )}

          <ToastContainer autoClose={2500} theme="colored" hideProgressBar />
        </div>

        {/* Pop-up Đăng nhập */}
        {showLogin && <Login close={() => setShowLogin(false)} />}

        {/* Pop-up Đăng ký */}
        {showRegister && <Register close={() => setShowRegister(false)} />}
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
