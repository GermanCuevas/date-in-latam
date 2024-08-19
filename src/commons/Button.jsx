"use client";
const Button = ({ text, bg, redirectionHandle, to }) => {
  return (
    <button
      className={`flex ${bg} items-center border border-myColorBlack-500 px-[20px] py-[8px] gap-x-1  rounded-md text-base font-black text-myColorBlack-500 dark:text-myColorWhite-500 justify-center`}
      onClick={() => {
        redirectionHandle(to);
      }}
    >
      {text}
    </button>
  );
};

export default Button;
