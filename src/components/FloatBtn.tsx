"use client";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FloatBtn = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const pathname = usePathname();
  //const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerWidth, setInnerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setInnerWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      handleResize(); // Ejecuta la función inmediatamente para establecer el valor inicial

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const differnteRoute = pathname !== "/es" && pathname !== "/es/login" && pathname !== "/es/register" && pathname !== "/en" && pathname !== "/en/login" && pathname !== "/en/register";

  const hoverEffect = "transform transition-transform duration-300 hover:scale-110";

  if (innerWidth)
    return (
      <button
        onClick={() => {
          document.documentElement.classList.toggle("dark");
          setDarkModeOn(!darkModeOn);
        }}
        className={`fixed ${differnteRoute && innerWidth < 768 ? "-bottom-[-60px]" : "-bottom-[-10px]"} right-2 sm:right-20 p-3 sm:p-5 shadow-custom  border-myColorBlack-500 rounded-full ${hoverEffect} float-animation bg-secondary-500 dark:bg-secondary-700`}
      >
        {!darkModeOn ? <MoonIcon className="size-5 spin-animation sm:size-7" /> : <SunIcon className="size-5 spin-animation sm:size-7" />}
      </button>
    );
};

export default FloatBtn;
