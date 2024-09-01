"use client";
import Button from "@/commons/Button";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

//max-w-3xl
const Landing = () => {
     // Estado para almacenar el número de la imagen
  const [imageNumber, setImageNumber] = useState(1);

  const handleClick = () => {
    console.log("click");
  }
  // useEffect para generar un número aleatorio al montar el componente
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 8) + 1; // Genera un número entre 1 y 8
    setImageNumber(randomNumber);
  }, []);
  return (
    <div className="flex justify-evenly w-[90%]">
      <div className="flex flex-col flex-1 max-w-4xl">
        <div className="text-myColorBlack-500 dark:text-myColorWhite-500 h-96">
          <h1 className="text-6xl font-bold mb-10">¡Te estábamos esperando!</h1>
          <h3 className="text-4xl">Unimos a latinos y a quienes aman Latinoamérica.</h3>
          <h3 className="text-4xl">¿Buscas amor o amistad?</h3>
          <h3 className="text-4xl">Aquí encontrarás encuentros genuinos, ya sea para el amor de tu vida o alguien con quien compartir memes. ¡Haz match, ríe y disfruta!</h3>
        </div>
        <div>
          <Button to={"parametroFalso"} type={"button"} text={"¡Configuremos tu perfil!"} variant={"primary"} fontSize={"text-4xl"} Icon={ArrowRightIcon} handleFunction={handleClick}  />
        </div>
      </div>
      <div className="flex w-[394px]">
        <Image src={`/assets/landing0${imageNumber}.png`} width={394} height={394} alt={`Logo en landing ${imageNumber}`} />
      </div>
    </div>
  );
};

export default Landing;
