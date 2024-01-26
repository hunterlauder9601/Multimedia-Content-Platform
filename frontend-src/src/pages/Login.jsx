import React, { useState, useEffect } from "react";
import { auth } from "../util/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        navigate("/admin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fireLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin");
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-full min-h-[calc(100vh-43px)] max-h-fit bg-zinc-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-blue-500 inline pt-[97px]">Login</h1>

      <form onSubmit={fireLogin} className="mt-4 w-full max-w-sm">
        <div>
          <label className="block text-white text-lg mb-2">Email:</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter email"
          />
        </div>

        <div className="mt-4">
          <label className="block text-white text-lg mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter password"
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 mb-8 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
