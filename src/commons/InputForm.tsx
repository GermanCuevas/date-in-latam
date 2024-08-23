"use client";
const InputForm = ({ type, placeholder, setDataForm, dataForm, name , width  }) => {

  //console.log("dataForm ===>", `${dataForm[name]?.label }=> ${dataForm[name]?.red}`);
  

  const handleChange = (e) => {
    setDataForm((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: e.target.value },
    }));
  };
 
  return (
    <input
      name={name}
      value={dataForm[name]?.value}
      onChange={handleChange}
      type={type}
      placeholder={placeholder}
      className={`${width} border-b-2 focus:outline-none text-myColorBlack-500 dark:text-myColorWhite-500 bg-transparent placeholder-myPlaceholder-500 pl-3 pb-1 
      ${!dataForm[name]?.red ? 'border-myColorBlack-500' : 'border-myColorRed-500'}  `}
    
    />
  );
};

export default InputForm;
//border-myColorBlack-500
//dark:border-myRedColor-500
