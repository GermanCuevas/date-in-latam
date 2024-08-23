"use client";
import InputForm from "@/commons/InputForm";
import { useEffect, useState } from "react";

const MultipleInputs = (dataArray, setDataForm, dataForm, widthBox, dataLength) => {

  return (
    <div
      className={`grid gap-x-3 ${widthBox}`}
      style={{
        gridTemplateColumns: `repeat(${dataLength}, minmax(0, 1fr))`,
      }}
    >
      {dataArray.map((obj) => {
        return <InputForm key={obj.name} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={""} />;
      })}
    </div>
  );
};
// <InputForm />
export default MultipleInputs;
