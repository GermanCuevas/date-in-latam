"use client";
import InputForm from "@/commons/InputForm";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormFields from "@/types/FormFields";
import { InputField } from "@/utils/dataToInputs";

interface MultipleInputsInterface {
  dataArray: InputField[];
  setDataForm: Dispatch<SetStateAction<FormFields>>;
  dataForm: FormFields;
  dataLength?: number | undefined;
  errorObject?: {};
  widthWindow: number | null;
}

const MultipleInputs = ({ dataArray, setDataForm, dataForm, dataLength, errorObject, widthWindow }: MultipleInputsInterface) => {
  const [valueWindow, setValueWindow] = useState(widthWindow);
  const [responsive, setResponsive] = useState(false);

  useEffect(() => {
    // Función para manejar el cambio de tamaño de la ventana
    const handleResize = () => {
      setValueWindow(window.innerWidth);
    };
    // Agrega el event listener para el resize
    window.addEventListener("resize", handleResize);
    // Configura el estado inicial
    handleResize();
    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (valueWindow) {
      if (valueWindow > 640) {
        setResponsive(true);
      } else {
        setResponsive(false);
      }
    }
  }, [valueWindow]);

  return (
    <>
      {dataArray[0]?.titleBox ? (
        <div className="flex flex-col gap-y-2 text-myPlaceholder-500 text-sm sm:text-base ">
          {dataArray[0]?.titleBox}
          <div
            className={`grid gap-y-3 sm:gap-x-3`}
            style={{
              gridTemplateColumns: responsive ? `repeat(${dataLength}, minmax(0, 1fr))` : `repeat(1, minmax(0, 1fr))`,
            }}
          >
            {dataArray.map((obj) => {
              return <InputForm key={obj.name} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={"w-full"} errorObject={errorObject} options={obj.options} fontSizeInput={"normal"} />;
            })}
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-y-6 sm:gap-x-3`}
          style={{
            gridTemplateColumns: responsive ? `repeat(${dataLength}, minmax(0, 1fr))` : `repeat(1, minmax(0, 1fr))`,
          }}
        >
          {dataArray.map((obj) => {
            return <InputForm key={obj.name} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={"w-full"} errorObject={errorObject} options={obj.options} fontSizeInput={"normal"}/>;
          })}
        </div>
      )}
    </>
  );
};

export default MultipleInputs;
