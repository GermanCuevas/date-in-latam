"use client";
//import { useRouter } from "next/navigation.js";
import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useState } from "react";
import validationFields from "@/app/utils/validationFileds";
import MultipleInputs from "./MultipleInputs";

//Cuando se hacen los datos a pedir en el formulario, asegurarse de que el "name" sea el mismo que el "label" que va en el useState
const Form = () => {
  const dataInputs = [
    [
      {
        type: "text",
        placeholder: "Nombre",
        name: "name",
      },
      {
        type: "text",
        placeholder: "Apellido",
        name: "surname",
      },
    ],
    {
      type: "text",
      placeholder: "Email",
      name: "email",
    },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
    },
    {
      type: "password",
      placeholder: "Repita el password",
      name: "repeatPassword",
    },
    [
      {
        type: "text",
        placeholder: "Dia",
        name: "day",
      },
      {
        type: "text",
        placeholder: "Mes",
        name: "month",
      },
      {
        type: "text",
        placeholder: "Año",
        name: "year",
      },
    ],
    {
      type: "text",
      placeholder: "Ciudad",
      name: "city",
    },
    {
      type: "text",
      placeholder: "Pais",
      name: "country",
    },
    {
      type: "text",
      placeholder: "Genero",
      name: "gender",
    },
    {
      type: "text",
      placeholder: "Quiero conocer",
      name: "toKnow",
    },
  ];

  //El siguieente useState es para guardar los datos del formulario
  const [dataForm, setDataForm] = useState({
    email: { value: "", red: false, label: "email" },
    name: { value: "", red: false, label: "name" },
    surname: { value: "", red: false, label: "surname" },
    day: { value: "", red: false, label: "day" },
    month: { value: "", red: false, label: "month" },
    year: { value: "", red: false, label: "year" },
    country: { value: "", red: false, label: "country" },
    city: { value: "", red: false, label: "city" },
    gender: { value: "", red: false, label: "gender" },
    toKnow: { value: "", red: false, label: "toKnow" },
    password: { value: "", red: false, label: "password" },
    repeatPassword: { value: "", red: false, label: "repeatPassword" },
  });
  //
  const renderArray = (obj) => {
    if (Array.isArray(obj)) {
      //className="flex flex-col gap-y-1"
      return (
        <div>
          {obj[0].name === "day" && <span className="text-myPlaceholder-500 pl-3 mb-2">Fecha de nacimiento</span>}
          {MultipleInputs(obj, setDataForm, dataForm, widthBox, obj.length)}
        </div>
      );
    }
  };

  const widthBox = "w-[470px] ";

  const mapingData = () => {
    const dataMap = dataInputs.map((obj) => {
      return <>{Array.isArray(obj) ? renderArray(obj) : <InputForm key={obj.name} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={widthBox} />}</>;
    });

    const middleIndex = Math.ceil(dataMap.length / 2); // Calcula la mitad del array
    // Divide el array en dos partes
    const firstHalf = dataMap.slice(0, middleIndex);
    const secondHalf = dataMap.slice(middleIndex);

    //aqui colocar el breakpoint para el responsive =>
    return (
      <div className="flex flex-col h-sm:flex-row gap-6 w-full">
        <div className="flex flex-col gap-y-6">{firstHalf}</div>
        <div className="flex flex-col gap-y-6">{secondHalf}</div>
      </div>
    );
  };

  const handleSubmit = () => {
    validationFields(dataForm, setDataForm);
    console.log(dataForm);
  };
  const fontWeight = "font-semibold";

  return (
    <form className={`flex flex-col p-5 shadow-xl rounded-md gap-y-6 bg-myColorTransparent-500 ${fontWeight}`}>
      {mapingData()}
      <div className={`${widthBox} text-center mt-2`}>
        <p className="text-myColorBlack-500 dark:text-myColorWhite-500 font-normal">
          Al registrarte, confirmas que tienes más de 18 años y aceptas nuestros <span className="font-black">Términos y Condiciones</span>, los cuales incluyen nuestras <span className="font-black">políticas de cookies</span>.
        </p>
      </div>
      <Button text={"Registrarme ahora"} bg={"bg-vibrant-500"} type="submit" handleFunction={handleSubmit} to={""} />
    </form>
  );
};
export default Form;
//<InputForm key={obj.name} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={widthBox} />;
