"use client";
import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useState } from "react";
import validateEmptyFields from "@/utils/validateEmptyFields";
import validateFormatInputs from "@/utils/validateFormatInputs";
import FormFields from "@/types/FormFields";
import { dataInputsLogin } from "@/utils/dataToInputs";
import { InputField } from "@/utils/dataToInputs";
import { ErrorFieldsForm } from "@/types/ErrorFields";
import { useRouter } from "next/navigation";
//firebase
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

//Formulario de login
//Todos los campos del formulario deben declararse dentro del useState para poder ser usados en el formulario.
//Luego deben colocarse los respectivos valores dentro de un array para poder mapear los Inputs, que son commons.

const Form = () => {
  const router = useRouter();
  const [errorObject, setErrorObject] = useState<ErrorFieldsForm>({});

  const [dataForm, setDataForm] = useState<FormFields>({
    email: { value: "", red: false, label: "email" },
    password: { value: "", red: false, label: "password" },
  });

  const handleSubmit = async () => {
    const notSendSubmit = await validateEmptyFields({ setDataForm });
    if (notSendSubmit) {
      console.log("El formulario no se debe enviar, hay campos vacios");
      return;
    }
    await validateFormatInputs({ dataForm, setErrorObject });
    console.log("dataForm =>", dataForm);
    if (dataForm.email && dataForm.password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, dataForm.email?.value, dataForm.password?.value);
        console.log("Usuario autenticado:", userCredential.user);
        router.push("/discover");
        return userCredential.user;
      } catch (error: any) {
        console.error("Error al iniciar sesión:", error.message);
        return null;
      }
    }
    //router.push("/");
  };

  return (
    <>
      <form className={`flex flex-col p-5 shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500 font-semibold w-[290px] sm:w-[340px]`}>
        {dataInputsLogin.map(({ type, placeholder, name }: InputField) => {
          return <InputForm key={name} type={type} placeholder={placeholder} name={name} setDataForm={setDataForm} dataForm={dataForm} width={"w-72"} errorObject={errorObject} titleSelect={""} fontSizeInput={"normal"} colorFont="normal" />;
        })}
        <Button text={"Ingresar 💖"} variant={"primary"} type="submit" handleFunction={handleSubmit} to={""} fontSize={"normal"} />
      </form>
      <span>{}</span>
    </>
  );
};

export default Form;
