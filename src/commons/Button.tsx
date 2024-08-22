"use client";
const Button = ({ text, bg, handleFunction, to, type }) => {
  return (
    <button
      type={type}
      className={`flex ${bg} font-bold shadow-xl items-center border-myColorBlack-500 px-[20px] py-[8px] gap-x-1 rounded-md text-base  text-myColorBlack-500 dark:text-myColorWhite-500 justify-center`}
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
    </button>
  );
};

export default Button;
