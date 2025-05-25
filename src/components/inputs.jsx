import { BiCurrentLocation, BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const Inputs = ({ setQuery, setUnits, weather, favorites, setFavorites, setShowLogin }) => {
  const [city, setCity] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const { user } = useAuth();

  // Fetch favorites from Firestore when user logs in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            console.log("Favorites from Firestore:", userSnap.data().favorites); // Debugging
            setFavorites(userSnap.data().favorites || []);
          } else {
            setFavorites([]);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      } else {
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, [user, setFavorites]);
  

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      toast.info("Fetching current location...");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoadingLocation(false);
          const { latitude, longitude } = position.coords;
          setQuery({ lat: latitude, lon: longitude });
          toast.success("Location retrieved successfully!");
        },
        (error) => {
          setLoadingLocation(false);
          toast.error("Failed to retrieve location. Please enable location access.");
          console.error("Geolocation Error:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    if (!weather?.name) return;

    const userRef = doc(db, "users", user.uid);
    try {
      if (favorites.includes(weather.name)) {
        setFavorites((prevFavorites) => prevFavorites.filter((city) => city !== weather.name));
        await updateDoc(userRef, { favorites: arrayRemove(weather.name) });
      } else {
        setFavorites((prevFavorites) => [...prevFavorites, weather.name]);
        await updateDoc(userRef, { favorites: arrayUnion(weather.name) });
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Failed to update favorites.");
    }
  };

  return (
    <div className="xl flex flex-col md:flex-row justify-center my-6 items-center">
      <div className="flex flex-row w-full md:w-3/4 items-center justify-center space-x-2">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Search by city..."
          className="text-gray-500 text-xl font-light p-1 w-full shadow-xl capitalize focus:outline-none"
        />
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={30}
          className={`cursor-pointer transition ease-out hover:scale-125 ${
            loadingLocation ? "animate-spin text-blue-500" : ""
          }`}
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row w-full md:w-1/4 items-center justify-center space-x-2 mt-4 md:mt-0">
        <button className="text-2xl font-light transition ease-out hover:scale-125" onClick={() => setUnits("metric")}>
          °C
        </button>
        <p className="text-2xl font-light">|</p>
        <button className="text-2xl font-light transition ease-out hover:scale-125" onClick={() => setUnits("imperial")}>
          °F
        </button>
        {weather && (
          <button
            className={`text-3xl transition ease-out hover:scale-125 ${
              favorites.includes(weather.name) ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={handleToggleFavorite}
          >
            ★
          </button>
        )}
      </div>
    </div>
  );
};

export default Inputs;
