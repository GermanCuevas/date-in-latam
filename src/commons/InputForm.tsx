"use client";
const InputForm = ({ type, placeholder, setDataForm, dataForm, name, width /* ,errorObject */, errorObject }) => {
  /* console.log("errorObject ===>",errorObject); */

  const handleChange = (e) => {
    setDataForm((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: e.target.value },
    }));
  };
  //console.log("errorObject ====>", errorObject);

  return (
    <div className="relative">
      <input
        name={name}
        value={dataForm[name]?.red ? "" : dataForm[name]?.value} //si el borde es color rojo, no se puede escribir en el input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className={`${width} border-b-2 focus:outline-none text-myColorBlack-500 dark:text-myColorWhite-500 bg-transparent placeholder-myPlaceholder-500 pl-3 pb-1 
      ${!dataForm[name]?.red ? "border-myColorBlack-500" : "border-myColorRed-500"}  `}
      />
      <span className="absolute left-0 bottom-[-22px] text-myColorRed-500 text-sm font-semibold">
      {errorObject[name]?.message}
      </span>
    </div>
  );
};

export default InputForm;
