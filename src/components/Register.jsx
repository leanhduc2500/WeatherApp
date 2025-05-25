import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

const Register = ({ close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Successful registration!");
      close();
    } catch (error) {
      toast.error("Unsuccessful registration!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-500 px-4 py-2 text-white" onClick={handleRegister}>
          Sign Up
        </button>
        <button className="ml-4 text-red-500" onClick={close}>Đóng</button>
      </div>
    </div>
  );
};

export default Register;
