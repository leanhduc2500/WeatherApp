import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Register from "./Register";


const AuthButtons = () => {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="absolute top-4 right-4 flex space-x-4">
      {user ? (
        <>
          <span className=" bg-green-500 px-3 py-2 rounded text-white">{user.email}</span>
          <button className="bg-red-500 px-3 py-2 rounded" onClick={logout}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <button className="bg-orange-500 px-3 py-2 rounded" onClick={() => setShowLogin(true)}>
          Log In
          </button>
          <button className="bg-green-500 px-3 py-2 rounded" onClick={() => setShowRegister(true)}>
            Sign Up
          </button>
        </>
      )}

      {showLogin && <Login close={() => setShowLogin(false)} />}
      {showRegister && <Register close={() => setShowRegister(false)} />}
    </div>
  );
};

export default AuthButtons;
