"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation.js';

const FloatBtn = () => {
  const router = useRouter();
  const hoverEffect = "transform transition-transform duration-300 hover:scale-110";
  return (
    <button
      onClick={() => {
        router.push("/");
      }}
      className={`absolute -top-[-70px] left-20 p-2 shadow-custom  border-myColorBlack-500 ${hoverEffect}  bg-secondary-500 dark:bg-secondary-700`}
    >
      <ArrowLeftIcon className="size-8" />
    </button>
  );
};

export default FloatBtn;
