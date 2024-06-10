"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth";
import axiosInstance from "../lib/axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("authToken", response.data.token);
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="px-[30px] w-full bg-white rounded-lg  md:mt-0 sm:max-w-md lg:pl-[220px]">
      <h1 className="text-2xl mb-2 lg:text-3xl">Login Page</h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
        <div>
          <label
            className="mb-2 text-sm font-medium pr-2 lg:text-lg"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="border-2 border-gray-300 sm:text-sm rounded-lg p-0.5 lg:px-2"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            className="pr-3 mb-2 text-sm font-medium lg:text-lg"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="border-2 border-gray-300 sm:text-sm rounded-lg p-0.5 lg:px-2"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div></div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          className="border-gray-300 bg-gray-500 text-white sm:text-sm rounded-lg px-2 flex justify-center lg:px-6 py-1"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
