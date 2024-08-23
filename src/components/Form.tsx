"use client";

import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useState } from "react";
import validationFields from "@/app/utils/validationFileds";

//Formulario de login
//Todos los campos del formulario deben declararse dentro del useState para poder ser usados en el formulario.
//Luego deben colocarse los respectivos valores dentro de un array para poder mapear los Inputs, que son commons.

const Form = () => {
  const dataInputs = [
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
  ];

  const [dataForm, setDataForm] = useState({
    email: { value: "", red: false, label: "email" },
    password: { value: "", red: false, label: "password" },
  });

  const handleSubmit = () => {
    validationFields(dataForm, setDataForm);
  };
  const fontWeight = "font-semibold";
  return (
    <form className={`flex flex-col p-5 shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500 ${fontWeight}`}>
      {dataInputs.map(({ type, placeholder, name }) => {
        return <InputForm key={name} type={type} placeholder={placeholder} name={name} setDataForm={setDataForm} dataForm={dataForm} width={"w-72"} />;
      })}
      <Button text={"Ingresar 💖"} bg={"bg-vibrant-500"} type="submit" handleFunction={handleSubmit} to={""} />
    </form>
  );
};

export default Form;
