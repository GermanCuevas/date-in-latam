"use client";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const FloatBtn = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);

  const hoverEffect = "transform transition-transform duration-300 hover:scale-110";
  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        setDarkModeOn(!darkModeOn);
      }}
      className={`fixed -bottom-[-10px] right-0 sm:right-20 p-3 sm:p-5 shadow-custom  border-myColorBlack-500 rounded-full ${hoverEffect} float-animation bg-secondary-500 dark:bg-secondary-700`}
    >
      {!darkModeOn ? <MoonIcon className="size-5 spin-animation sm:size-7" /> : <SunIcon className="size-5 spin-animation sm:size-7" />}
    </button>
  );
};

export default FloatBtn;
