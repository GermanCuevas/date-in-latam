import { useState, useRef, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

interface Props {
  titleTextArea: string;
  maxLength: number;
  name: string;
  setDataFromBack: () => void;
  dataFromBack: {};
  dataChanged: {};
}

const TextArea = ({ titleTextArea, maxLength, name, setDataFromBack, dataFromBack, dataChanged, setDataChanged }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [disabled, setDisabled] = useState(true);
  const [activeChange, setActiveChange] = useState(false);
  const [saveState, setSaveState] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataChanged({ ...dataChanged, [name]: e.target.value });
    autoResizeTextArea();
    setActiveChange(true);
    //console.log("dataChanged dentro del handle change=>", dataChanged);
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
      setSaveState(false)
      console.log(`se envia el fetch ! ${name}`);
      
    }
  }, [dataChanged[name], disabled, saveState]);

  const handleSave = () => {
    setSaveState(true)
    setShowOptions(false);
  };

  const handleCancel = () => {
    setDataChanged({ ...dataChanged, [name]: dataFromBack[name] });
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
          }}
        >
          <span className="text-sm sm:text-base">Editar</span>
          <PencilSquareIcon className="size-5 " />
        </button>
      </div>
      <textarea
        id={name}
        ref={textAreaRef}
        className="resize-none rounded text-myColorBlack-500 dark:text-myColorWhite-500 overflow-hidden bg-secondary-200 disabled:bg-[#d1d1e0] dark:disabled:bg-[#47476b]"
        value={dataChanged[name]}
        onChange={handleChange}
        maxLength={maxLength}
        style={{ minHeight: "50px" }} // Altura mínima por defecto
        disabled={disabled}
        onBlur={() => {
          setDisabled(true);
        }}
      />

      {showOptions && activeChange && dataFromBack[name] !== dataChanged[name] ? (
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
