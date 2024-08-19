"use client";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const FloatBtn = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);

  const hoverEffect = "transform transition-transform duration-300 hover:scale-110";
  return (
    <button
      onClick={(e) => {
        document.documentElement.classList.toggle("dark");
        setDarkModeOn(!darkModeOn);
      }}
      className={`absolute -bottom-[-20px] right-20 p-5 border border-myColorBlack-500 rounded-full shadow-md shadow-xl ${hoverEffect} float-animation`}
    >
      {!darkModeOn ? <MoonIcon className="size-7 spin-animation" /> : <SunIcon className="size-7 spin-animation" />}
    </button>
  );
};

export default FloatBtn;
