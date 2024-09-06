"use client";
import Select, { SingleValue, ActionMeta } from "react-select";
import { usePathname, useRouter } from "next/navigation.js";

const countryOptions = [
  { value: "en", label: "ENG", flag: "/assets/select/England.svg" },
  { value: "es", label: "ESP", flag: "/assets/select/Spain.svg" },
];

interface lngInterface {
  lng: string;
}

const SelectLanguaje = ({ lng }: lngInterface) => {
  const router = useRouter();
  const path = usePathname();

  const actualLanguage = {
    value: lng,
    label: `${lng}`.toUpperCase(),
  };

  const registerPath = path.replace("/es", "").replace("/en", "");

  interface inputSelect {
    value: string;
    label: string;
  }

  const handleSelectLanguaje = (newValue: SingleValue<inputSelect>, _actionMeta: ActionMeta<inputSelect>) => {
    console.log(newValue);
    if (newValue) {
      const value = newValue.value;
      router.push(`/${value}${registerPath}`);
    }
  };

  const customStyles = {
    optionImage: {
      width: "20%",
      height: "20%",
    },
    control: (provided: {}) => ({
      ...provided,
      backgroundColor: "rgb(106, 5, 69, .5)", // Cambia el color de fondo del control
      fontSize: "12px",
    }),
    menu: (provided: {}) => ({
      ...provided,
      backgroundColor: "rgb(106, 5, 69, .5)", // Cambia el color de fondo del menú desplegable
      fontSize: "12px",
    }),
    option: (provided: {}, state: { isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(222, 199, 252, 0.25)" : "transparent", // Cambia el fondo de las opciones cuando se seleccionan o están enfocadas
      color: "#F0F0F0",
      cursor: "pointer",
    }),
    singleValue: (provided: {}) => ({
      ...provided,
      color: "#F0F0F0", // Cambia el color del texto de la opción seleccionada
    }),
  };
  interface customOptionRendererInterface {
    innerProps?: {};
    label: string;
    data: {
      flag?: string;
      value: string;
      label: string;
    };
  }

  const customOptionRenderer = ({ innerProps, label, data }: customOptionRendererInterface) => {
    console.log("aflag==>", data.flag);
    return (
      <div
        {...innerProps}
        style={{
          cursor: "pointer",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "400",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          paddingLeft: "5px",
        }}
      >
        <img src={data.flag} alt={label} style={customStyles.optionImage} />
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className=" absolute top-5 sm:top-10 right-2 sm:right-20 z-20">
      <Select
        options={countryOptions}
        className="dark:text-myColorWhite-600 text-myColorBlack-600 font-black  bg-myColorTransparent-500"
        onChange={handleSelectLanguaje}
        value={actualLanguage}
        styles={customStyles}
        components={{
          Option: customOptionRenderer,
        }}
      />
    </div>
  );
};

export default SelectLanguaje;
