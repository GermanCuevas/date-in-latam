import FormFields from "@/types/FormFields";
import { OptionsOrGroups } from "react-select";

type FormFieldKeys = keyof FormFields;

interface OptionType {
  value: number | string;
  label: string;
}

interface InputField {
  type: "button" | "select" | "text" | "password" | "submit";
  placeholder: string;
  name: FormFieldKeys;
  titleBox?: string; // Opcional
  options?: OptionsOrGroups<OptionType, any>; // Opcional
}


type DataToInputs = (InputField | InputField[])[];

const generateDaysOptions = (start = 1, end = 31) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push({ value: i, label: `${i}` });
  }
  return options;
};
const daysOptions = generateDaysOptions();

const generateYearsOptions = (minAge = 18, maxAge = 100) => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - maxAge; // Año desde el que empieza el rango
  const endYear = currentYear - minAge; // Año hasta el que llega el rango
  const options = [];
  for (let year = startYear; year <= endYear; year++) {
    options.push({ value: year, label: `${year}` });
  }
  return options;
};
const yearsOptions = generateYearsOptions();

const dataToInputs: DataToInputs = [
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
      type: "select",
      placeholder: "Dia",
      name: "day",
      titleBox: "Fecha de nacimiento",
      options: daysOptions,
    },
    {
      type: "select",
      placeholder: "Mes",
      name: "month",
      options: [
        { value: "January", label: "Enero" },
        { value: "February", label: "Febrero" },
        { value: "March", label: "Marzo" },
        { value: "April", label: "Abril" },
        { value: "May", label: "Mayo" },
        { value: "June", label: "Junio" },
        { value: "July", label: "Julio" },
        { value: "August", label: "Agosto" },
        { value: "September", label: "Septiembre" },
        { value: "October", label: "Octubre" },
        { value: "November", label: "Noviembre" },
        { value: "December", label: "Diciembre" },
      ],
    },
    {
      type: "select",
      placeholder: "Año",
      name: "year",
      options: yearsOptions,
    },
  ],
  {
    type: "text",
    placeholder: "Ciudad / Locacion",
    name: "city",
  },
  {
    type: "select",
    placeholder: "Mi genero",
    name: "gender",
    titleBox: "Mi genero",
    options: [
      { value: "Hombre", label: "Hombre" },
      { value: "Mujer", label: "Mujer" },
      { value: "No binario", label: "No binario" },
      { value: "Prefiero no decir", label: "Prefiero no decir" },
    ],
  },
  {
    type: "select",
    placeholder: "Quiero conocer",
    name: "toKnow",
    titleBox: "Quiero conocer",
    options: [
      { value: "Hombre", label: "Hombre" },
      { value: "Mujer", label: "Mujer" },
      { value: "No binario", label: "No binario" },
      { value: "Prefiero no decir", label: "Prefiero no decir" },
    ],
  },
];

export default dataToInputs;
