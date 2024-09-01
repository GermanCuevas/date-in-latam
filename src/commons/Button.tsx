"use client";
import { FC } from "react";
import React from "react";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  handleFunction: (to: string) => void;
  to: string ;
  variant: "primary" | "secondary";
  fontSize?: string;
  Icon?: React.ComponentType<{ className?: string }> | null;
  widthButton?: boolean ;
}

const Button: FC<ButtonProps> = ({ text, type, handleFunction, to, variant, fontSize, Icon, widthButton }) => {
  const variantSwitch = {
    primary: `bg-vibrant-500 hover:bg-vibrant-600`,
    secondary: `bg-myColorTransparent-500 hover:bg-vibrant-300`,
  };
  //text-base
  return (
    <button
      type={type}
      className={`relative flex  ${variantSwitch[variant]} ${fontSize} font-bold shadow-xl items-center border-myColorBlack-500 px-[20px] py-[8px] gap-x-1 rounded-md  text-myColorBlack-500 dark:text-myColorWhite-500 justify-center  hover:bg-vibrant-600 ${widthButton ? "w-full" : ""}`}
      onClick={(e) => {
        if (type !== "submit") {
          e.preventDefault();
          if (handleFunction && typeof handleFunction === "function") {
            handleFunction(to);
          }
        } else {
          e.preventDefault();
          if (handleFunction && typeof handleFunction === "function") {
            handleFunction(to);
          }
        }
      }}
    >
      {text}
      {Icon && <Icon className="h-[40px]" />}
    </button>
  );
};

export default Button;
