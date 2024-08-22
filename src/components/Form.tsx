"use client";
//import { useRouter } from "next/navigation.js";
import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useState } from "react";

const Form = () => {
  const [showAlertEmptyField, setShowAlertEmptyField] = useState(false);

  const [dataForm, setDataForm] = useState({
    email: { value: "", red: false, label: "email" },
    password: { value: "", red: false, label: "password" },
  });

  const handleSubmit = () => {
    let newDataForm = { ...dataForm };

    if (newDataForm.email.value === "") {
      newDataForm.email = { ...newDataForm.email, red: true };
    }

    if (newDataForm.password.value === "") {
      newDataForm.password = { ...newDataForm.password, red: true };
    }
    setDataForm(newDataForm);
    setTimeout(() => {
      setDataForm({
        ...newDataForm,
        email: { ...newDataForm.email, red: false },
        password: { ...newDataForm.password, red: false },
      });
    }, 2000);
    console.log("dataForm===>>>", newDataForm);
  };

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

  return (
    <form className="flex flex-col p-5 shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500">
      {dataInputs.map(({ type, placeholder, name }) => {
        return <InputForm key={name} type={type} placeholder={placeholder} name={name} setDataForm={setDataForm} dataForm={dataForm} />;
      })}
      <Button text={"Ingresar 💖"} bg={"bg-vibrant-500"} type="submit" handleFunction={handleSubmit} to={""} />
    </form>
  );
};

export default Form;

/* stylesTailwind={"w-72 focus:outline-none text-myColorBlack-500 border-b-2 border-myColorBlack-500 bg-transparent placeholder-myPlaceholder-500 pl-3 pb-1"} */
