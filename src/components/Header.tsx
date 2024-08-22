import Image from "next/image";
import { HomeIcon, HeartIcon, EyeIcon, ChatBubbleBottomCenterTextIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Header = () => {
  return (
    <header className={`h-[65px] flex bg-gradientLight dark:bg-gradientDark justify-center`}>
      <div className="flex w-[90%] items-center">
        <div className="flex flex-1">
          <Image src="/assets/DateinLatamLogo.svg" width={48} height={48} alt="Data in latam Logo" />
          <Image src="/assets/LogoDate.svg" width={101} height={55} alt="Data in latam Logo" />
        </div>
        <nav className="flex w-[700px] text-base font-black text-myColorBlack-500 dark:text-myColorWhite-500">
          <ul className="flex justify-between w-full">
            <li className="flex items-center">
              <Link href="#" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="flex items-center ">Inicio</span>
                  <HomeIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="#" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="flex items-center">Likes</span>
                  <HeartIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="#" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="flex items-center">Visitantes</span>
                  <EyeIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="#" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="flex items-center">Mensajes</span>
                  <ChatBubbleBottomCenterTextIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <button
                onClick={() => {
                  document.documentElement.classList.toggle("dark");
                }}
                className="flex bg-vibrant-500 items-center border border-myColorBlack-500 px-[20px] py-[8px] gap-x-1  rounded-md"
              >
                <span>Más</span>
                <PlusCircleIcon className="size-7" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
