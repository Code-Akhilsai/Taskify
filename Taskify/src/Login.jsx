import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      nav("/todo");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-white/70 mb-6">
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-white/80 text-sm mt-6">
          Don’t have an account?
          <span
            onClick={() => nav("/signup")}
            className="text-yellow-300 font-medium cursor-pointer ml-1"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
