"use client";
import React, { FC } from "react";
import ThemeButton from "./ThemeButton";

const Header: FC = () => {
  return (
    <header className="flex h-10 items-center h-[50px] px-[30px] lg:px-[150px]">
      <div className="h-6">
        <p className="font-meduim text-xs">meduim alike</p>
      </div>
    </header>
  );
};

export default Header;
