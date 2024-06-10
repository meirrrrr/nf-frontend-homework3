"use client";
import React from "react";
import { useTheme } from "../context/theme";
import { FC } from "react";

const ThemeButton: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-800 text-white rounded"
    >
      Switch to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
};

export default ThemeButton;
