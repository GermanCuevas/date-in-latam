"use client";
import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useEffect, useState } from "react";
import validateEmptyFields from "@/utils/validateEmptyFields";
import MultipleInputs from "./MultipleInputs";
import validateFormatInputs from "@/utils/validateFormatInputs";
import { dataToInputsToCompleteGoogleRegister } from "@/utils/dataToInputs";
import React from "react";
import FormFields from "@/types/FormFields";
import { InputField } from "@/utils/dataToInputs";
import { usePathname, useRouter } from "next/navigation.js";
import { toast } from "sonner";

import axios from "axios";

//Cuando se hacen los datos a pedir en el formulario, asegurarse de que el "name" sea el mismo que el "label" que va en el useState
const FormCompleteDataGoogle = () => {
  const pathname = usePathname(); // Obtiene la URL actual
  const [currentPath, setCurrentPath] = useState(pathname);
  const router = useRouter();
  


  useEffect(() => {
    if (pathname !== "es/register") {
      //console.log("que?");
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

  const [dataInputs] = useState(dataToInputsToCompleteGoogleRegister);

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
    await validateEmptyFields({ setDataForm });
    await validateFormatInputs({ dataForm, setErrorObject });

    console.log("dataForm en componente Form=>", dataForm);
    try {
      if (dataForm.email && dataForm.password && dataForm.email.value && dataForm.password.value) {
        //la creacion del user con Auth se hace en el backend, lo mismo que el  save en la base de datos ->
        const resp = await axios.post("http://localhost:5000/date-in-latam/us-central1/addUser", dataForm);
        console.log(resp);
        if (resp.data === "Usuario creado con exito") {
          toast("Usuario creado con exito", { position: "top-center", style: { backgroundColor: "rgba(202, 199, 252, 0.7)", border: "2px solid #948ffa" } });
        } else {
          toast("Error al crear usuario", { position: "bottom-center", style: { backgroundColor: "rgb(255, 204, 204 , 0.7)", border: "2px solid #948ffa" } });
        }
        //router.push("/welcome");
        //return user;
      }
    } catch (error: any) {
      console.error("Error al registrar usuario:", error.message);
      return null;
    }
  };



  const handleRedirect = (to: string) => {
    router.push(to);
  };


  const fontWeight = "font-semibold";
  const widthBox = "w-[470px]";
  return (
    <div className="flex gap-20 items-center">
      <form className={`flex flex-col p-5 shadow-xl rounded-md gap-y-6 bg-myColorTransparent-500 ${fontWeight}`}>
        {mapingData()}
        <Button text={"Actualizar mis datos"} variant={"primary"} type="submit" handleFunction={handleSubmit} to={""} fontSize={"normal"} widthButton={false} />
      </form>
    </div>
  );
};
export default FormCompleteDataGoogle;
