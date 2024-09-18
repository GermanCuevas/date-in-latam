"use client";
import { useRouter } from "next/navigation.js";
import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useState } from "react";
import validateEmptyFields from "@/utils/validateEmptyFields";
import validateFormatInputs from "@/utils/validateFormatInputs";
import FormFields from "@/types/FormFields";
import { dataToPreferences } from "@/utils/dataToInputs";
/* import { InputField } from "@/utils/dataToInputs"; */
import { ErrorFieldsForm } from "@/types/ErrorFields";
import TextArea from "@/commons/TextArea";
import { InputField } from "@/utils/dataToInputs";

//Formulario de login
//Todos los campos del formulario deben declararse dentro del useState para poder ser usados en el formulario.
//Luego deben colocarse los respectivos valores dentro de un array para poder mapear los Inputs, que son commons.

const FormSetPreferences = () => {
  const [errorObject, setErrorObject] = useState<ErrorFieldsForm>({});
  const [dataForm, setDataForm] = useState<FormFields>({
    iHaveChildren: { value: { value: "", label: "seleccionar..." }, red: false, label: "iHaveChildren" },
    wantChildren: { value: { value: "", label: "seleccionar..." }, red: false, label: "wantChildren" },
    smoker: { value: { value: "", label: "seleccionar..." }, red: false, label: "smoker" },
    drinker: { value: { value: "", label: "seleccionar..." }, red: false, label: "drinker" },
    relationshipStatus: { value: { value: "", label: "seleccionar..." }, red: false, label: "relationshipStatus" },
    education: { value: { value: "", label: "seleccionar..." }, red: false, label: "education" },
    willingToRelocate: { value: { value: "", label: "seleccionar..." }, red: false, label: "willingToRelocate" },
  });

  const handleSubmit = async () => {
    const notSendSubmit = await validateEmptyFields({ setDataForm });
    if (notSendSubmit) {
      console.log("El formulario no se debe enviar, hay campos vacios");
      return;
    }
    const objMessage = await validateFormatInputs({ dataForm, setErrorObject });
    //setErrorObject(objMessage)
    // console.log("dataForm en componente Form=>",dataForm);
    //router.push("/");
  };
  //const InputForm = ({ type, placeholder, setDataForm, dataForm, name, width, errorObject, options , titleSelect}) => {
  //const Button = ({ text, type, handleFunction, to, variant, fontSize, Icon , widthButton }) =>
  const fakeData = {
    title: "Cientifico",
    aboutMe: "",
    aboutYou: "",
  };
  interface interfaceState {
    title: string;
    aboutMe: string;
    aboutYou: string;
  }
  const [dataFromBack, setDataFromBack] = useState<interfaceState>(fakeData);
  const [dataChanged, setDataChanged] = useState<interfaceState>(fakeData);
  const fontWeight = "font-semibold";

  return (
    <>
      <div className={`flex flex-col p-5 shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500 ${fontWeight} w-[90%] mb-20 `}>
        <h3 className="text-myColorBlack-500 dark:text-myColorWhite-500 text-xl">Datos sobre mi</h3>
        <div className="w-[100%] flex flex-col gap-10">
          <TextArea titleTextArea="Ocupación" maxLength={30} name="title" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataChanged={setDataChanged} />
          <TextArea titleTextArea="Altura" maxLength={10} name="aboutMe" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataChanged={setDataChanged} />
          <TextArea titleTextArea="Religión" maxLength={30} name="aboutYou" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataChanged={setDataChanged} />
        </div>
        {dataToPreferences.map((obj) => {
          if (!Array.isArray(obj)) return <InputForm key={obj.name} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={"w-72"} errorObject={errorObject} fontSizeInput={"normal"} options={obj.options} titleSelect={obj.titleBox} colorFont="changeMode" />;
        })}
      </div>
    </>
  );
};

export default FormSetPreferences;
