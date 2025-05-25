import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

const Login = ({ close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully Logged In!");
      close();
    } catch (error) {
      toast.error("Unsuccessfully log in!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="border p-2 w-full mb-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 px-4 py-2 text-white" onClick={handleLogin}>
          Log In
        </button>
        <button className="ml-4 text-red-500" onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Login;
