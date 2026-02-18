import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const handleLogin = () => {
    nav("/login");
  };

  const handleSignup = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
      name,
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-white/70 mb-6">
          Join us and start your journey 🚀
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition active:scale-95"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-white/80 text-sm mt-6">
          Already have an account?
          <span
            className="text-yellow-300 font-medium cursor-pointer ml-1"
            onClick={handleLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
