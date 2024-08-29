"use client";
import { useEffect, useRef, useState, Dispatch, SetStateAction, ChangeEvent } from "react";
//import SelectForm from "./SelectForm";
import Select, { SingleValue, OptionsOrGroups, PropsValue } from "react-select";
import Button from "./Button";
import getDaysInMonth from "@/utils/getDaysInMonth";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
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
  errorObject?: {};
}

const InputForm: FC<InputProps> = ({ type, placeholder, setDataForm, dataForm, name, width, errorObject, options, titleSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null); // Referencia al contenedor

  useEffect(() => {
    const validateDate = async () => {
      if (dataForm?.year?.value?.value && dataForm?.day?.value?.value && dataForm?.month?.value?.value) {
        const date = new Date(`${dataForm.month.value.value} ${dataForm.day.value.value}, ${dataForm.year.value.value}`);
        if (date.getFullYear() === Number(dataForm.year.value.value) && date.getMonth() === new Date(`${dataForm.month.value.value} 1`).getMonth() && date.getDate() === Number(dataForm.day.value.value)) {
          console.log("Fecha valida");
        } else {
          console.log("La fecha no es válida");
          let cantDias = getDaysInMonth(dataForm?.month?.value?.value.toString(), dataForm?.year?.value?.value.toString());

          setDataForm((prev) => {
            console.log("prev", prev); // Verifica el contenido de prev
            return {
              ...prev,
              day: { ...prev.day, value: { value: cantDias.toString(), label: `${cantDias}` } },
            };
          });
        }
      }
    };
    validateDate();
  }, [dataForm?.day?.value?.value, dataForm?.month?.value?.value, dataForm?.year?.value?.value]);


  const handleChange = async (newValue: ChangeEvent<HTMLInputElement>) => {
    if (newValue) {
      setDataForm((prevDataForm) => ({
        ...prevDataForm,
        [name]: {
          ...prevDataForm[name],
          value:  newValue.target.value,
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
  };

  const handleChangeSelectComponent = async (newValue: SingleValue<string | inputSelect>) => {
    if (newValue && typeof newValue !== 'string') {
      setDataForm((prevDataForm) => ({
        ...prevDataForm,
        [name]: {
          ...prevDataForm[name],
          value: { value: newValue.value.toString(), label: `${newValue.value}` } ,
        },
      }));
    }
  };

  const customStyles = {
    control: (provided : {} ) => ({
      ...provided,
      borderColor: !dataForm[name]?.red ? "black" : "red", // Cambia el color del borde a rojo
      boxShadow: "none", // Elimina cualquier sombra del borde
    }),
  };

  const handleSelect = (namePlace: string) => {

    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      city: {
        ...prevDataForm.city,
        value: namePlace,
      },
    }));

    setSuggestions([]);
  };

  // Maneja clics fuera de los elementos relevantes
  /*     useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current) {
          setSuggestions([]);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []); */

  type InputValueType = string ;
  //type ValueSelect = PropsValue<inputSelect> | string ;
// typeof dataForm[name]?.value === "object" ? dataForm[name]?.value : "";
  if (type === "select" && typeof dataForm[name]?.value === "object") {
    //const inputSelectValue : ValueSelect = dataForm[name]?.value;
    return (
      <div className="flex flex-col gap-y-2 text-myPlaceholder-500">
        {titleSelect}
        <Select options={options} placeholder={placeholder} value={dataForm[name]?.value} className={`text-myColorBlack-500 `} styles={customStyles} onChange={handleChangeSelectComponent} />
      </div>
    );
  } else {
    const inputValue: InputValueType = typeof dataForm[name]?.value === "string" ? dataForm[name]?.value : "";
    return (
      <div className="relative" ref={containerRef}>
        <input
          name={name}
          value={dataForm[name]?.red ? "" : inputValue} //si el borde es color rojo, no se puede escribir en el input
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          className={`${width} border-b-2 focus:outline-none text-myColorBlack-500 dark:text-myColorWhite-500 bg-transparent placeholder-myPlaceholder-500 pl-3 pb-1 
      ${!dataForm[name]?.red ? "border-myColorBlack-500" : "border-myColorRed-500"}   `}
        />
        <span className="absolute left-0 bottom-[-22px] text-red-500 text-stroke-black text-sm font-semibold ">{errorObject[name]?.message}</span>
        {suggestions.length > 0 && name === "city" ? (
          <div className="absolute bg-gradientLight dark:bg-gradientDark z-10 flex flex-col gap-y-1 rounded-md mt-1 w-full p-1">
            <button
              className="absolute right-[-10px] z-30 top-[-15px]"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSuggestions([]);
                setDataForm({
                  ...dataForm,
                  city: {
                    ...dataForm.city,
                    value: "",
                  },
                });
              }}
            >
              <XCircleIcon className="size-8" />
            </button>
            {suggestions
              ?.map((e, i) => {
                return (
                  <div key={`${i}-${type}`} className="">
                    <Button text={e} variant={"secondary"} widthButton={true} type={"button"} handleFunction={handleSelect} to={e} />
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
