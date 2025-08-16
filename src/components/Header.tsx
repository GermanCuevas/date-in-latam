"use client";
import Image from "next/image";
import { HomeIcon, HeartIcon, EyeIcon, ChatBubbleBottomCenterTextIcon, PlusCircleIcon, Bars4Icon, UserGroupIcon, UserIcon, PencilIcon, PowerIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { SetStateAction, Dispatch, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { infoUser } from "@/store/infoUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ menu, setMenu }: Props) => {
  const router = useRouter();

  const controls = useAnimation();
  const rotate = useMotionValue(0);

  const inverseRotate = useTransform(rotate, (value) => -value);

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return; // Evita ejecución en SSR
    if (!mounted) return;
    
    const sequence = async () => {
      while (true) {
        // Agrega easing consistente y tiempos un poco más largos para transiciones suaves
        await controls.start({
          rotate: 0,
          borderRadius: "0%",
          scale: 1,
          transition: { duration: 1.5, ease: "easeInOut" },
        });
        rotate.set(0);

        await controls.start({
          rotate: 0,
          borderRadius: "10%", // un paso intermedio para suavizar el cambio
          scale: 1,
          transition: { duration: 0.8, ease: "easeInOut" },
        });
        rotate.set(0);

        await controls.start({
          rotate: 180,
          borderRadius: "50%",
          scale: 1,
          transition: { duration: 2, ease: "easeInOut" },
        });
        rotate.set(180);

        await controls.start({
          rotate: 180,
          borderRadius: "40%", // un paso intermedio para suavizar
          scale: 1,
          transition: { duration: 1.8, ease: "easeInOut" },
        });
        rotate.set(180);

        await controls.start({
          rotate: 0,
          borderRadius: "0%",
          scale: 1,
          transition: { duration: 1.5, ease: "easeInOut" },
        });
        rotate.set(0);

        await new Promise((r) => setTimeout(r, 1500)); // repeatDelay
      }
    };
    sequence();
  }, [controls, rotate]);

  const imgUserToNavbar = infoUser((state) => state.imgUserToNavbar); // 👈 leer valor
  
  console.log(imgUserToNavbar);
  return (
    <header className={`h-[55px] md:h-[65px] fixed bottom-0 md:top-0 flex bg-gradientLight dark:bg-gradientDark justify-center z-10 w-full`}>
      <div className="flex w-[90%] items-center">
        <div className="flex flex-1 gap-3 ">
          <Image src="/assets/DateinLatamLogo.svg" width={48} height={48} alt="Data in latam Logo" className="hidden lg:flex" />
          <Image src="/assets/LogoDate.svg" width={101} height={55} alt="Data in latam Logo" className="hidden lg:flex" />
        </div>
        <nav className="flex w-[700px] text-base font-black text-myColorBlack-500 dark:text-myColorWhite-500">
          <ul className="flex justify-between w-full">
            <li className="items-center hidden  relative cursor-pointer item-to-hover md:inline-block">
              <div className="bg-vibrant-500 items-center border border-myColorBlack-500 px-[20px] py-[8px] gap-x-1 rounded-md hidden md:flex">
                <span>Más</span>
                <PlusCircleIcon className="size-7" />
              </div>

              <div className="hidden item-to-show">
                <div className="absolute  bg-vibrant-400 dark:bg-vibrant-600 max-w-80	p-5  flex flex-col gap-y-3 rounded">
                  <div className="w-[200px] hover:text-tertiary-700">
                    <Link className="flex whitespace-nowrap justify-between" href="/me">
                      Mi vista
                      <UserIcon className="size-5" />
                    </Link>
                  </div>
                  <div className="w-[200px] hover:text-tertiary-700">
                    <Link className="flex whitespace-nowrap justify-between" href="/edit-my-profile">
                      <span>Editar mi perfil</span>
                      <PencilIcon className="size-5" />
                    </Link>
                  </div>

                  <div className="h-[1px] w-full bg-[#333333] mt-4" />

                  <div className="w-[200px] hover:text-tertiary-700">
                    <div className="flex whitespace-nowrap justify-between" onClick={handleLogOut}>
                      <span>Cerrar sesión</span>
                      <PowerIcon className="size-5" />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/*             <li className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="flex gap-x-1 ">
                  <span className="items-center hidden sm:flex ">Inicio</span>
                  <HomeIcon className="size-7" />
                </div>
              </Link>
            </li> */}
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

            <div className="relative">
              <motion.div
                style={{
                  ...box,
                  rotate: rotate, // animamos con MotionValue directamente
                }}
                animate={controls}
              >
                <motion.img
                  src={imgUserToNavbar || ""}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                    display: "block",
                    rotate: inverseRotate, // imagen gira en sentido inverso para parecer fija
                  }}
                />
              </motion.div>
              <div className="absolute bottom-[2px] right-[-2px] w-[15px] h-[15px] rounded-full bg-green-500 border-2 border-white box-content" />
            </div>

            <li className="items-center flex md:hidden ">
              <button
                onClick={() => {
                  console.log("Colocar menu");
                  setMenu(!menu);
                }}
                className="bg-vibrant-500 items-center border border-myColorBlack-500 px-[20px] py-[8px] gap-x-1 rounded-md hidden md:flex"
              >
                <span>Más</span>
                <PlusCircleIcon className="size-7" />
              </button>
              <button
                className="items-center flex md:hidden"
                onClick={() => {
                  console.log("Colocar menu");
                  setMenu(true);
                }}
              >
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

const box: React.CSSProperties = {
  width: "45px",
  height: "45px",
  overflow: "hidden",
  display: "inline-block",
  position: "relative",
};

export default Header;
