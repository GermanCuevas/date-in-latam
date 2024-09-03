import Image from "next/image";
import { HomeIcon, HeartIcon, EyeIcon, ChatBubbleBottomCenterTextIcon, PlusCircleIcon, Bars4Icon, UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Header = () => {
  //const headeMobileFirst = ""
  return (
    <header className={`h-[60px] md:h-[65px] fixed bottom-0 md:top-0 flex bg-gradientLight dark:bg-gradientDark justify-center z-10 w-full`}>
      <div className="flex w-[90%] items-center">
        <div className="flex flex-1 ">
          <Image src="/assets/DateinLatamLogo.svg" width={48} height={48} alt="Data in latam Logo" className="hidden lg:flex" />
          <Image src="/assets/LogoDate.svg" width={101} height={55} alt="Data in latam Logo" className="hidden lg:flex" />
        </div>
        <nav className="flex w-[700px] text-base font-black text-myColorBlack-500 dark:text-myColorWhite-500">
          <ul className="flex justify-between w-full">
            <li className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="items-center hidden sm:flex ">Inicio</span>
                  <HomeIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/likes" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="items-center hidden sm:flex ">Likes</span>
                  <HeartIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/visitors" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="items-center hidden sm:flex ">Visitantes</span>
                  <EyeIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/messages" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="items-center hidden sm:flex ">Mensajes</span>
                  <ChatBubbleBottomCenterTextIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="#" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="items-center hidden sm:flex ">Descubre</span>
                  <UserGroupIcon className="size-7" />
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <button
                onClick={() => {
                  document.documentElement.classList.toggle("dark");
                }}
                className="bg-vibrant-500 items-center border border-myColorBlack-500 px-[20px] py-[8px] gap-x-1 rounded-md hidden md:flex"
              >
                <span>Más</span>
                <PlusCircleIcon className="size-7" />
              </button>

              <button className="items-center flex md:hidden">
                <div className="flex gap-x-1 ">
                  <Bars4Icon className="size-9" />
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}; //UserGroupIcon

export default Header;
