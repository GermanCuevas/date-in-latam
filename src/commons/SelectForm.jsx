"use client";
import Select from "react-select";

const SelectForm = ({ type, placeholder, setDataForm, dataForm, name, width, errorObject,options }) => {
  return (
    <div className="">
      <Select options={options} placeholder={placeholder} className="text-myColorBlack-500" />
    </div>
  );
};

export default SelectForm;
