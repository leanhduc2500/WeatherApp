import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Theo dõi trạng thái đăng nhập của user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadFavorites(currentUser.uid); // Tải danh sách Favorites từ Firestore
      } else {
        setUser(null);
        setFavorites([]); // Xóa danh sách Favorites khi đăng xuất
      }
    });

    return () => unsubscribe();
  }, []);

  // Hàm tải danh sách Favorites từ Firestore
  const loadFavorites = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setFavorites(docSnap.data().favorites || []);
      } else {
        await setDoc(userRef, { favorites: [] });
        setFavorites([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách Favorites:", error);
    }
  };

  // Cập nhật danh sách Favorites trong Firestore
  const updateFavorites = async (newFavorites) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { favorites: newFavorites });
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Lỗi khi cập nhật danh sách Favorites:", error);
    }
  };

  // Đăng xuất và reset danh sách Favorites
  const logout = async () => {
    try {
      await signOut(auth);
      setFavorites([]); // Reset danh sách Favorites ngay lập tức
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, favorites, updateFavorites, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
