import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import CmOrFt from "./CmOrFt";
import {interfacePreferencesAndEditInfo} from "@/types/PreferencesAndEditInfo";

interface Keys{
  heigthNumber: string;
  ocupation: string;
  religion : string;
  title : string;
  aboutMe : string; 
  aboutYou : string;
}

type KeyState = keyof Keys;

interface Props {
  titleTextArea: string;
  maxLength: number;
  name: KeyState;
  setDataFromBack: Dispatch<SetStateAction<interfacePreferencesAndEditInfo>>;
  setDataChanged: Dispatch<SetStateAction<interfacePreferencesAndEditInfo>>;
  dataFromBack: interfacePreferencesAndEditInfo;
  dataChanged: interfacePreferencesAndEditInfo;
}

const TextArea = ({ titleTextArea, maxLength, name, setDataFromBack, dataFromBack, dataChanged, setDataChanged }: Props) => {
  console.log(dataFromBack);

  const [showOptions, setShowOptions] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [disabled, setDisabled] = useState(true);
  const [activeChange, setActiveChange] = useState(false);
  const [saveState, setSaveState] = useState(false);
  const [changeFirst, setChangeFirst] = useState(false);
  const [isHeight, setHeight] = useState(false);
  

  //validamos que solo acepte numeros y un punto
  const regex = /^$|^[0-9](\d*|(\.\d*)?)$/;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (titleTextArea === "Altura") {
      if (regex.test(e.target.value)) {
        setDataChanged({ ...dataChanged, [name]: e.target.value });
        autoResizeTextArea();
        setActiveChange(true);
      }
    } else {
      setDataChanged({ ...dataChanged, [name]: e.target.value });
      autoResizeTextArea();
      setActiveChange(true);
    }
  };

  // Función para ajustar la altura automáticamente
  const autoResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Restablecer la altura para medir correctamente
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Ajustar a la altura del contenido
    }
  };

  useEffect(() => {
    autoResizeTextArea(); // Ajustar al cargar por primera vez
  }, []);

  useEffect(() => {
    const addPointToFt = () => {
      if (dataChanged.heightType == "ft" && dataChanged.heigthNumber) {
        if (dataChanged.heigthNumber.length > 1 && !dataChanged.heigthNumber.includes(".")) {
          let arrayDataChanged = dataChanged.heigthNumber.split("");
          arrayDataChanged.splice(1, 0, ".");
          setDataChanged({ ...dataChanged, heigthNumber: arrayDataChanged.join("") });
        }
      }
    };
    addPointToFt();
  }, [dataChanged.heigthNumber]);

  useEffect(() => {
    autoResizeTextArea(); // ajusta en caso de que se cancele, de esta manera vuelve al height original
    if (dataChanged[name]) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
    //console.log("disabled dewntro de useEffect=>", disabled);
    if (!disabled) {
      textAreaRef.current?.focus();
    }
    if (saveState) {
      setDataFromBack({ ...dataFromBack, [name]: dataChanged[name] });
      setSaveState(false);
      console.log(`se envia el fetch ! ${name}`);
    }
  }, [dataChanged[name], disabled, saveState]);

  const handleSave = () => {
    setSaveState(true);
    setShowOptions(false);
  };

  const handleCancel = () => {
    setDataChanged({ ...dataChanged, [name]: dataFromBack[name] });
  };

  const [valueCm, setValueCm] = useState(false);
  const [valueFt, setValueFt] = useState(false);

  useEffect(() => {
    if (dataFromBack.heightType === "cm") {
      console.log("cm elegido");
      setValueCm(true);
      setValueFt(false);
    }
    if (dataFromBack.heightType === "ft") {
      console.log("ft elegido ");
      setValueFt(true);
      setValueCm(false);
    }
  }, []);

  useEffect(() => {
    if (changeFirst) {
      if (titleTextArea === "Altura" && textAreaRef.current ) {
        if (valueCm && !valueFt && textAreaRef.current.value && dataChanged.heightType === "cm") {
          const cm = Number(dataChanged.heigthNumber) * 30.48;
          const cmRound = Math.round(cm)
          setDataChanged({ ...dataChanged, heigthNumber: cmRound.toString() });
        }
        if (valueFt && !valueCm && textAreaRef.current.value && dataChanged.heightType === "ft") {
          const cm = dataChanged.heigthNumber;
          const feet = Number(cm) / 30.48;
          setDataChanged({ ...dataChanged, heigthNumber: feet.toFixed(2) });
        }
      }
    }
  }, [valueCm, valueFt]);

  const handleChangeCm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!valueCm) {
      setValueCm(true);
      setValueFt(false);
      setChangeFirst(true);
      setDataChanged({ ...dataChanged, heightType: "cm" });
    }
  };

  const handleChangeFt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!valueFt) {
      setValueFt(true);
      setValueCm(false);
      setChangeFirst(true);
      setDataChanged({ ...dataChanged, heightType: "ft" });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="text-myColorBlack-500 dark:text-myColorWhite-500 text-sm sm:text-base">
          {titleTextArea}:
        </label>
        <button
          className="text-[#2eb82e] flex gap-1 border border-myColorBlack-500 dark:border-myColorWhite-600 w-fit p-1 rounded shadow-2xl"
          onClick={() => {
            setDisabled(false);
            console.log(titleTextArea);
            if (titleTextArea === "Altura") {
              setHeight(true);
            } else {
              setHeight(false);
            }
          }}
        >
          <span className="text-sm sm:text-base">Editar</span>
          <PencilSquareIcon className="size-5 " />
        </button>
      </div>
      {titleTextArea === "Altura" && <CmOrFt valueCm={valueCm} valueFt={valueFt} handleChangeCm={handleChangeCm} handleChangeFt={handleChangeFt} />}
      <textarea
        id={name}
        ref={textAreaRef}
        className="resize-none rounded text-myColorBlack-500 dark:text-myColorWhite-500 overflow-hidden bg-secondary-200 disabled:bg-myTextAreaColor-500 dark:disabled:bg-myTextAreaColor-600"
        value={dataChanged[name]}
        onChange={handleChange}
        maxLength={maxLength}
        style={{ minHeight: "50px" }} // Altura mínima por defecto
        disabled={disabled}
        onBlur={() => {
          setDisabled(true);
        }}
      />

      {dataChanged[name] && showOptions && activeChange && dataFromBack[name] !== dataChanged[name] ? (
        <>
          <div className="text-myColorBlack-500 dark:text-myColorWhite-500 flex justify-around">
            <Button text="Guardar" type="button" variant={"secondary"} fontSize={"normal"} handleFunction={handleSave} to="default" />
            <Button text="Cancelar" type="button" variant={"secondary"} fontSize={"normal"} handleFunction={handleCancel} to="default" />
          </div>
          <span className="text-xs text-myColorBlack-500 dark:text-myColorWhite-500">
            {dataChanged[name].length}/{maxLength}
          </span>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextArea;

{
  /* <div className="text-[#2eb82e] flex gap-1">
<span className="text-2xl">Edicion de perfil</span>
<PencilSquareIcon className="size-7 " />
</div> */
}
