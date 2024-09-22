import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HomeIcon, HeartIcon, EyeIcon, ChatBubbleBottomCenterTextIcon, PlusCircleIcon, Bars4Icon, UserGroupIcon, UserIcon , PencilIcon} from "@heroicons/react/24/solid";

const Menu = ({ menu, setMenu }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useRouter();

  //bubble: "bubble 0.5s ease-out forwards",
  // fadeSlideUp: "fadeSlideUp 0.6s ease-out forwards",
  // rotateExpand: "rotateExpand 0.7s ease-out forwards",
  // growCorner: "growCorner 0.5s ease-out forwards",
  // zoomBounce: "zoomBounce 0.8s ease-out forwards",
  // blurExpand: "blurExpand 0.6s ease-out forwards",
  //fadeSlideDown: "fadeSlideDown 0.6s ease-out forwards",
  //${isVisible ? "animate-fadeSlideUp" : "animate-fadeSlideDown"}

  const closeMenu = () => {
    setIsVisible(false);
    //el tiempo para pasar el menu a false debe coincidir con el tiempo de la animacion al cerrar el menu, en este caso 500ms
    setTimeout(() => {
      setMenu(false);
    }, 500);
  };

  return (
    <div className={`bg-gradientMenu w-[100%] h-[100%] z-50 fixed text-my-500 dark:text-myColorWhite-500 ${isVisible ? "animate-fadeSlideUp" : "animate-fadeSlideDown"} transition-transform duration-500 ease-out `}>
      <div className="absolute right-[5%] bottom-[2%] cursor-pointer" onClick={closeMenu}>
        <XCircleIcon className="size-10" />
      </div>
      <div className="flex justify-center mt-10">
        <Image src="/assets/LogoDate.svg" width={101} height={55} alt="Data in latam Logo" />
      </div>
      <div className="flex justify-center mt-10">
        <ul className="flex flex-col items-center gap-y-10">
          <li>
            <span
              onClick={() => {
                closeMenu();
                setTimeout(() => {
                  navigation.push("/me");
                }, 500);
              }}
              className="cursor-pointer flex items-center gap-x-2"
            >
              Mi vista
              <UserIcon className="size-5" />
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                closeMenu();
                setTimeout(() => {
                  navigation.push("/my-profile");
                }, 500);
              }}
              className="cursor-pointer flex items-center gap-x-2"
            >
              
              Editar mi perfil
              <PencilIcon className="size-5" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
