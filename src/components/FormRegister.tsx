"use client";
import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useEffect, useState } from "react";
import validateEmptyFields from "@/utils/validateEmptyFields";
import MultipleInputs from "./MultipleInputs";
import validateFormatInputs from "@/utils/validateFormatInputs";
import { dataToInputs } from "@/utils/dataToInputs";
import React from "react";
import FormFields from "@/types/FormFields";
import { InputField } from "@/utils/dataToInputs";
import { usePathname } from "next/navigation.js";

//Cuando se hacen los datos a pedir en el formulario, asegurarse de que el "name" sea el mismo que el "label" que va en el useState
const Form = () => {
  const pathname = usePathname(); // Obtiene la URL actual
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== "es/register") {
      console.log("que?");
    }
  }, []);

  const [errorObject, setErrorObject] = useState({});
  const [dataForm, setDataForm] = useState<FormFields>({
    email: { value: "", red: false, label: "email" },
    name: { value: "", red: false, label: "name" },
    surname: { value: "", red: false, label: "surname" },
    day: { value: { value: "", label: "Dia" }, red: false, label: "day" },
    month: { value: { value: "", label: "Mes" }, red: false, label: "month" },
    year: { value: { value: "", label: "Año" }, red: false, label: "year" },
    city: { value: "", red: false, label: "city" },
    gender: { value: { value: "", label: "Selecciona..." }, red: false, label: "gender" },
    toKnow: { value: { value: "", label: "Selecciona..." }, red: false, label: "toKnow" },
    password: { value: "", red: false, label: "password" },
    repeatPassword: { value: "", red: false, label: "repeatPassword" },
  });

  const [dataInputs] = useState(dataToInputs);

  const [innerWidth, setInnerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setInnerWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      handleResize(); // Ejecuta la función inmediatamente para establecer el valor inicial

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const renderArray = (obj: InputField[]) => {
    if (Array.isArray(obj)) {
      return MultipleInputs({ dataArray: obj, setDataForm, dataForm, dataLength: obj.length, errorObject, widthWindow: innerWidth });
    }
  };

  const mapingData = () => {
    const dataMap = dataInputs.map((obj, idx) => {
      return <React.Fragment key={`${idx}-map-inputs`}>{Array.isArray(obj) ? renderArray(obj) : <InputForm fontSizeInput={"normal"} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={widthBox} errorObject={errorObject} options={obj.options} titleSelect={obj?.titleBox} colorFont="normal" />}</React.Fragment>;
    });
    const middleIndex = Math.ceil(dataMap.length / 2); // Calcula la mitad del array
    const firstHalf = dataMap.slice(0, middleIndex);
    const secondHalf = dataMap.slice(middleIndex);

    return (
      <div className="flex flex-col h-sm:flex-row gap-6 w-full">
        <div className="flex flex-col gap-y-6">{firstHalf}</div>
        <div className="flex flex-col gap-y-6">{secondHalf}</div>
      </div>
    );
  };

  const handleSubmit = async () => {
    const notSendSubmit = await validateEmptyFields({ setDataForm });
    if (notSendSubmit) {
      console.log("El formulario no se debe enviar, hay campos vacios");
      // return;
    }
    await validateFormatInputs({ dataForm, setErrorObject });
    console.log("dataForm en componente Form=>", dataForm);
    //router.push("/welcome");
  };

  const fontWeight = "font-semibold";
  const widthBox = "w-[470px]";
  return (
    <form className={`flex flex-col p-5 shadow-xl rounded-md gap-y-6 bg-myColorTransparent-500 ${fontWeight}`}>
      {mapingData()}
      <div className={`w-[260px] sm:w-[470px] text-center mt-2`}>
        <p className="text-myColorBlack-500 dark:text-myColorWhite-500 font-normal text-sm sm:text-base">
          Al registrarte, confirmas que tienes más de 18 años y aceptas nuestros <span className="font-black">Términos y Condiciones</span>, los cuales incluyen nuestras <span className="font-black">políticas de cookies</span>.
        </p>
      </div>
      <Button text={"Registrarme ahora"} variant={"primary"} type="submit" handleFunction={handleSubmit} to={""} fontSize={"normal"} widthButton={false} />
    </form>
  );
};
export default Form;
