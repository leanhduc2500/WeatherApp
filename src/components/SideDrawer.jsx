import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

const SideDrawer = ({ setQuery, favorites, setFavorites, setIsDrawerOpen }) => {
    const [showAbout, setShowAbout] = useState(false);
    const { user } = useAuth();

    // Load danh sách Favorites từ Firestore khi user đăng nhập
    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        console.log("Favorites loaded in SideDrawer:", userSnap.data().favorites); // Debugging
                        setFavorites(userSnap.data().favorites || []);
                    } else {
                        setFavorites([]);
                    }
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            } else {
                setFavorites([]); // Xóa danh sách khi user đăng xuất
            }
        };

        fetchFavorites();
    }, [user]);

    const handleRemoveFavorite = async (city) => {
        if (!user) return;
        
        const userRef = doc(db, "users", user.uid);
        try {
            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== city));
            await updateDoc(userRef, { favorites: arrayRemove(city) });
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsDrawerOpen(false)}></div>
            <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 transform translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Menu</h2>
                <ul>
                    <li>
                        <button
                            className="w-full text-left py-2 px-4 hover:bg-gray-700"
                            onClick={() => {
                                setQuery({ q: "Seoul" });
                                setIsDrawerOpen(false);
                            }}
                        >
                            Home
                        </button>
                    </li>
                    <li className="mt-2">
                        <div className="text-left py-2 px-4">Favorites</div>
                        <ul className="ml-4">
                            {favorites.length > 0 ? (
                                favorites.map((city, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <button
                                            className="w-full text-left py-2 px-4 hover:bg-gray-700"
                                            onClick={() => {
                                                setQuery({ q: city });
                                                setIsDrawerOpen(false);
                                            }}
                                        >
                                            {city}
                                        </button>
                                        <button
                                            className="text-red-500 px-2 hover:text-red-700"
                                            onClick={() => handleRemoveFavorite(city)}
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 text-gray-400">No favorites added</li>
                            )}
                        </ul>
                    </li>
                    <li>
                        <button
                            className="w-full text-left py-2 px-4 hover:bg-gray-700"
                            onClick={() => setShowAbout(true)}
                        >
                            About
                        </button>
                    </li>
                </ul>
            </div>
          {showAbout && (
                <>
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowAbout(false)}></div>

                    {/* Pop-up content */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg w-96">
                            <h2 className="text-2xl font-bold mb-5 text-center">About This App</h2>
                            <div className="flex justify-between">
                                <ul className="text-left">
                                    <li>Project:</li>
                                    <li>Owner:</li>
                                    <li>Owner ID:</li>
                                    <li>Latest Update:</li>
                                </ul>
                                <ul className="text-right">
                                    <li>Weather Website</li>
                                    <li>Le Anh Duc</li>
                                    <li>2101040059</li>
                                    <li>16/03/2025</li>
                                </ul>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button
                                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700 transition duration-300"
                                    onClick={() => setShowAbout(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SideDrawer;
