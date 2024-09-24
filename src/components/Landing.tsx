"use client";
import Button from "@/commons/Button";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//max-w-3xl
const Landing = () => {
  const router = useRouter();
  // Estado para almacenar el número de la imagen
  const [imageNumber, setImageNumber] = useState(1);

  const handleClick = (to: string) => {
    console.log("click");
    router.push(to);
  };
  // useEffect para generar un número aleatorio al montar el componente
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 8) + 1; // Genera un número entre 1 y 8
    setImageNumber(randomNumber);
  }, []);
  return (
    <div className="flex justify-evenly w-[90%] h-[85%] md:h-[65%] ">
      <div className="flex flex-col items-center justify-evenly md:justify-between">
        <div className="text-myColorBlack-500 dark:text-myColorWhite-500 md:max-w-[880px]">
          <h1 className="text-5xl font-bold mb-6 text-center md:text-left md:text-6xl">¡Te estábamos esperando!</h1>
          <h3 className="text-xl text-center md:text-left md:text-4xl">Unimos a latinos y a quienes aman Latinoamérica.</h3>
          <h3 className="text-xl text-center md:text-left md:text-4xl">¿Buscas amor o amistad?</h3>
          <h3 className="text-xl text-center md:text-left md:text-4xl">Aquí encontrarás encuentros genuinos, ya sea para el amor de tu vida o alguien con quien compartir memes. ¡Haz match, ríe y disfruta!</h3>
        </div>
        <div>
          <Image src={`/assets/landing0${imageNumber}.png`} width={150} height={150} alt={`Logo en landing ${imageNumber}`} className="md:hidden" />
        </div>
        <div className="flex md:self-start md:justify-self-end">
          <Button to={"/edit-my-profile"} type={"button"} text={"¡Configuremos tu perfil!"} variant={"primary"} fontSize={"large"} Icon={ArrowRightIcon} handleFunction={handleClick} />
        </div>
      </div>
      <div className="hidden md:flex md:w-[400px] md:items-end">
        <Image src={`/assets/landing0${imageNumber}.png`} width={400} height={400} alt={`Logo en landing ${imageNumber}`} className="hidden md:block" />
      </div>
    </div>
  );
};

export default Landing;

{
  /* <div className="flex justify-evenly w-[90%]">
<div className="flex flex-col flex-1 max-w-4xl">
  <div className="text-myColorBlack-500 dark:text-myColorWhite-500 h-96">
    <h1 className="text-6xl font-bold mb-10">¡Te estábamos esperando!</h1>
    <h3 className="text-4xl">Unimos a latinos y a quienes aman Latinoamérica.</h3>
    <h3 className="text-4xl">¿Buscas amor o amistad?</h3>
    <h3 className="text-4xl">Aquí encontrarás encuentros genuinos, ya sea para el amor de tu vida o alguien con quien compartir memes. ¡Haz match, ríe y disfruta!</h3>
  </div>
  <div>
    <Button to={"parametroFalso"} type={"button"} text={"¡Configuremos tu perfil!"} variant={"primary"} fontSize={"large"} Icon={ArrowRightIcon} handleFunction={handleClick}  />
  </div>
</div>
<div className="flex w-[394px]">
  <Image src={`/assets/landing0${imageNumber}.png`} width={394} height={394} alt={`Logo en landing ${imageNumber}`} />
</div>
</div> */
}
