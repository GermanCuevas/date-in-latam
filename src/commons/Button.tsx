"use client";
const Button = ({ text, type, handleFunction, to, variant, fontSize, Icon }) => {
  const variantSwitch = {
    primary: `bg-vibrant-500 hover:bg-vibrant-600`,
    secondary: `bg-myColorTransparent-500 hover:bg-vibrant-300`,
  };
  //text-base
  return (
    <button
      type={type}
      className={`relative flex ${variantSwitch[`${variant}`]} ${fontSize} font-bold shadow-xl items-center border-myColorBlack-500 px-[20px] py-[8px] gap-x-1 rounded-md  text-myColorBlack-500 dark:text-myColorWhite-500 justify-center  hover:bg-vibrant-600`}
      onClick={(e) => {
        if (type !== "submit") {
          handleFunction(to);
        } else {
          e.preventDefault();
          handleFunction();
        }
      }}
    >
      {text}
      {Icon && <Icon className="h-[40px]" />}
    </button>
  );
};

export default Button;
