"use client";
import { useRouter } from "next/navigation.js";
import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useState } from "react";
import validateEmptyFields from "@/utils/validateEmptyFields";
import validateFormatInputs from "@/utils/validateFormatInputs";

//Formulario de login
//Todos los campos del formulario deben declararse dentro del useState para poder ser usados en el formulario.
//Luego deben colocarse los respectivos valores dentro de un array para poder mapear los Inputs, que son commons.

const Form = () => {
  const router = useRouter();
  const [errorObject, setErrorObject] = useState({});

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

  const handleSubmit = async () => {
    const notSendSubmit = await validateEmptyFields(setDataForm);
    if (notSendSubmit) {
      console.log("El formulario no se debe enviar, hay campos vacios");
      return;
    }
    const objMessage = await validateFormatInputs(dataForm, setErrorObject);
    //setErrorObject(objMessage)

    // console.log("dataForm en componente Form=>",dataForm);

    //router.push("/");
  };
  //const InputForm = ({ type, placeholder, setDataForm, dataForm, name, width, errorObject, options , titleSelect}) => {
  //const Button = ({ text, type, handleFunction, to, variant, fontSize, Icon , widthButton }) =>
  const fontWeight = "font-semibold";
  return (
    <>
      <form className={`flex flex-col p-5 shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500 ${fontWeight}`}>
        {dataInputs.map(({ type, placeholder, name }) => {
          return <InputForm key={name} type={type} placeholder={placeholder} name={name} setDataForm={setDataForm} dataForm={dataForm} width={"w-72"} errorObject={errorObject} options={""} titleSelect={""} />;
        })}
        <Button text={"Ingresar 💖"} variant={"primary"} type="submit" handleFunction={handleSubmit} to={""} fontSize={""} Icon={""} widthButton={""} />
      </form>
      <span>{}</span>
    </>
  );
};

export default Form;
