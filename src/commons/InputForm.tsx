"use client";
import { useEffect, useRef, useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { FC } from "react";
import Select, { SingleValue, OptionsOrGroups, ActionMeta } from "react-select";
import getDaysInMonth from "@/utils/getDaysInMonth";
import Button from "./Button";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ErrorFieldsForm } from "@/types/ErrorFields";
import FormFields from "@/types/FormFields";

interface inputSelect {
  value: string;
  label: string;
}
type FormFieldKeys = keyof FormFields;
interface InputProps {
  type: "button" | "select" | "text" | "password" | "submit";
  placeholder?: string;
  name: FormFieldKeys;
  options?: OptionsOrGroups<inputSelect, any>;
  width?: string;
  titleSelect?: string;
  setDataForm: Dispatch<SetStateAction<FormFields>>;
  dataForm: FormFields;
  errorObject?: ErrorFieldsForm;
  fontSizeInput: "normal" | "large";
  handleTitleChange?: () => void;
  colorFont: "normal" | "changeMode";
}

const InputForm: FC<InputProps> = ({ type, placeholder, setDataForm, dataForm, name, errorObject, options, titleSelect, fontSizeInput, colorFont }) => {
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null); // Referencia al contenedor

  const colorFontSwitch = {
    normal: "text-myPlaceholder-500",
    changeMode: "text-myColorBlack-500 dark:text-myColorWhite-500",
  };

  useEffect(() => {
    const validateDate = async () => {
      if (dataForm?.year?.value?.value && dataForm?.day?.value?.value && dataForm?.month?.value?.value) {
        const date = new Date(`${dataForm.month.value.value} ${dataForm.day.value.value}, ${dataForm.year.value.value}`);
        if (date.getFullYear() === Number(dataForm.year.value.value) && date.getMonth() === new Date(`${dataForm.month.value.value} 1`).getMonth() && date.getDate() === Number(dataForm.day.value.value)) {
          console.log("Fecha valida");
        } else {
          console.log("La fecha no es válida");
          let cantDias = getDaysInMonth(dataForm?.month?.value?.value.toString(), dataForm?.year?.value?.value.toString());

          setDataForm({ ...dataForm, day: { ...dataForm.day, value: { value: cantDias.toString(), label: `${cantDias}` } } });
          /*           setDataForm((prev) => {
            //console.log("prev", prev); // Verifica el contenido de prev
            return {
              ...prev,
              day: { ...prev.day, value: { value: cantDias.toString(), label: `${cantDias}` } },
            };
          }); */
        }
      }
    };
    validateDate();
  }, [dataForm?.day?.value?.value, dataForm?.month?.value?.value, dataForm?.year?.value?.value]);

  const handleChange = async (newValue: ChangeEvent<HTMLInputElement>) => {
    //if (name !== "titleProfile") {
    console.log(newValue.target.value);

    if (newValue) {
      setDataForm((prevDataForm) => ({
        ...prevDataForm,
        [name]: {
          ...prevDataForm[name],
          value: newValue.target.value,
        },
      }));
      if (name === "city" && newValue.target.value.length > 3) {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${newValue.target.value}&format=json`);
        const data = await response.json();
        const displaysNames = data.map((item: { display_name: string }) => item.display_name); // Obtiene los nombres de las ciudades
        setSuggestions(displaysNames);
      }
      if (name === "city" && newValue.target.value.length <= 3) {
        setSuggestions([]);
      }
    }
    // }
  };

  const handleChangeSelectComponent = async (newValue: SingleValue<string | inputSelect>, _actionMeta: ActionMeta<inputSelect>) => {
    if (newValue && typeof newValue !== "string") {
      setDataForm((prevDataForm) => ({
        ...prevDataForm,
        [name]: {
          ...prevDataForm[name],
          value: { value: newValue.value.toString(), label: `${newValue.value}` },
        },
      }));
    }
  };

  const customStyles = {
    control: (provided: {}) => ({
      ...provided,
      borderColor: !dataForm[name]?.red ? "black" : "red", // Cambia el color del borde a rojo
      boxShadow: "none", // Elimina cualquier sombra del borde
    }),
  };

  const handleSelect = (namePlace: string) => {
    setDataForm((prevDataForm) => {
      if (typeof prevDataForm.city?.value === "string") {
        prevDataForm.city.value = namePlace;
      }
      return prevDataForm;
    });
    // setDataForm((prevDataForm) => ({
    //   ...prevDataForm,
    //   city: {
    //     ...prevDataForm.city,
    //     value: namePlace,
    //   },
    // }));
    setSuggestions([]);
  };

  if (type === "select" && dataForm[name]?.value && typeof dataForm[name]?.value === "object" && typeof dataForm[name]?.value !== "string") {
    const inputValueToSelect: inputSelect = dataForm[name]?.value as inputSelect;
    return (
      <div className={`flex flex-col gap-y-2 ${colorFontSwitch[colorFont]} text-sm sm:text-base`}>
        <div className="flex justify-between ">
          <span>{titleSelect}</span>
        </div>
        <Select options={options} placeholder={placeholder} value={inputValueToSelect} className={`text-myColorBlack-500 `} styles={customStyles} onChange={handleChangeSelectComponent} />
        {inputValueToSelect.value === "No mostrar" || inputValueToSelect.value === "" ? (
          <div className="flex gap-x-1">
            <p className="text-xs text-soft-700 dark:text-primary-50"> (*) Este dato no se mostrara en tu perfil</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else if (errorObject) {
    const fontSizeSwitch = {
      normal: "text-sm sm:text-base",
      large: "text-3xl sm:text-6xl",
    };
    const inputValue: string = dataForm[name]?.value as string;
    return (
      <div className="relative" ref={containerRef}>
        <input
          name={name}
          value={dataForm[name]?.red ? "" : inputValue} //si el borde es color rojo, no se puede escribir en el input
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          className={`w-full ${fontSizeSwitch[fontSizeInput]} italic  border-b-2 focus:outline-none text-myColorBlack-500 dark:text-myColorWhite-500 bg-transparent placeholder-myPlaceholder-500 pl-3 pb-1 
      ${!dataForm[name]?.red ? "border-myColorBlack-500" : "border-myColorRed-500"}   `}
        />
        {/* <span className="absolute left-0 bottom-[-22px] text-red-500 text-stroke-black text-sm font-semibold ">{errorObject[name]?.message}</span> */}
        {suggestions.length > 0 && name === "city" ? (
          <div className="absolute bg-gradientLight dark:bg-gradientDark z-10 flex flex-col gap-y-1 rounded-md mt-1 w-full p-1">
            <button
              className="absolute right-[-10px] z-30 top-[-15px]"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSuggestions([]);
                setDataForm((prevDataForm) => {
                  if (typeof prevDataForm.city?.value === "string") {
                    prevDataForm.city.value = "";
                  }
                  return prevDataForm;
                });
              }}
            >
              <XCircleIcon className="size-8" />
            </button>
            {suggestions
              ?.map((e, i) => {
                return (
                  <div key={`${i}-${type}`} className="">
                    <Button text={e} variant={"secondary"} widthButton={true} type={"button"} handleFunction={handleSelect} to={e} fontSize={"normal"} />
                  </div>
                );
              })
              .splice(0, 4)}
          </div>
        ) : null}
      </div>
    );
  }
};

export default InputForm;
