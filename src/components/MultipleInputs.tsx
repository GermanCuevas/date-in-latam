"use client";
import InputForm from "@/commons/InputForm";


const MultipleInputs = (dataArray, setDataForm, dataForm, widthBox, dataLength, errorObject) => {

  return (
    <>
      {dataArray[0]?.titleBox ? (
        <div className="flex flex-col gap-y-2 text-myPlaceholder-500">
          {dataArray[0]?.titleBox}
          <div
            className={`grid gap-x-3 ${widthBox}`}
            style={{
              gridTemplateColumns: `repeat(${dataLength}, minmax(0, 1fr))`,
            }}
          >
            {dataArray.map((obj) => {
              return <InputForm key={obj.name} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={"w-full"} errorObject={errorObject} options={obj.options} />;
            })}
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-x-3 ${widthBox}`}
          style={{
            gridTemplateColumns: `repeat(${dataLength}, minmax(0, 1fr))`,
          }}
        >
          {dataArray.map((obj) => {
            return <InputForm key={obj.name} type={obj.type} placeholder={obj.placeholder} name={obj.name} setDataForm={setDataForm} dataForm={dataForm} width={"w-full"} errorObject={errorObject}  options={obj.options} />;
          })}
        </div>
      )}
    </>
  );
};

export default MultipleInputs;
