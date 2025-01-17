"use client";
import { FC } from "react";
import React from "react";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  handleFunction?: (to: string) => void;
  to: string;
  variant: "primary" | "secondary";
  fontSize: "normal" | "large";
  Icon?: React.ComponentType<{ className?: string }> | null;
  widthButton?: boolean;
  onWith40px?: boolean;
  handleFunctionWithoutParam?: () => void;
}

const Button: FC<ButtonProps> = ({ text, type, handleFunction, handleFunctionWithoutParam, to, variant, fontSize, Icon, widthButton, onWith40px }) => {
  const variantSwitch = {
    primary: `bg-vibrant-500 hover:bg-vibrant-600`,
    secondary: `bg-myColorTransparent-500 hover:bg-vibrant-300`,
  };

  const fontSizeSwitch = {
    normal: "text-sm sm:text-base",
    large: "text-sm sm:text-4xl sm:font-bold",
  };
  //text-base
  //hover:bg-vibrant-600

  return (
    <button
      type={type}
      className={`relative flex  ${variantSwitch[variant]} ${fontSizeSwitch[fontSize]} font-bold shadow-xl items-center border-myColorBlack-500 px-[10px] sm:px-[20px] py-[8px] gap-x-1 rounded-md  text-myColorBlack-500 dark:text-myColorWhite-500 justify-center ${widthButton ? "w-[full]" : ""}${onWith40px ? "w-[40px]" : ""} `}
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
        if (type === "button" && handleFunctionWithoutParam) {
          handleFunctionWithoutParam();
        }
      }}
    >
      {text}
      {Icon && <Icon className="h-[20px] sm:h-[40px]" />}
    </button>
  );
};

export default Button;
