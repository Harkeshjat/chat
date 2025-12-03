// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await client.post("/auth/register", form);
      login(data); // auto-login after register
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="glass-card p-8 mt-8">
        <h1 className="text-2xl font-semibold mb-2 text-white">
          Create your account 🚀
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Join your team workspace and start chatting.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 border border-red-500/40 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-xl bg-slate-900/60 border border-slate-700/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-xl bg-slate-900/60 border border-slate-700/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="w-full rounded-xl bg-slate-900/60 border border-slate-700/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Minimum 6 characters"
            />
          </div>

          <button
            disabled={loading}
            className="w-full mt-2 bg-accent hover:bg-indigo-500 transition-colors rounded-xl py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent hover:text-indigo-400 underline-offset-2 underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
