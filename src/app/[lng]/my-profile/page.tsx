"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ErrorFieldsForm } from "@/types/ErrorFields";
import FormFields from "@/types/FormFields";
import TextArea from "@/commons/TextArea";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import ImageProfile from "@/commons/ImageProfile";

const fakeData = {
  title: "titulo ejemplo",
  aboutMe: "",
  aboutYou: "",
};

const MyProfile = () => {
  const [errorObject, setErrorObject] = useState<ErrorFieldsForm>({});
  const [dataForm, setDataForm] = useState<FormFields>({
    titleProfile: { value: "", red: false, label: "email" },
  });
  //para el input text-5xl
  const [dataFromBack, setDataFromBack] = useState(fakeData);
  const [dataChanged, setDataChanged] = useState(fakeData);
  const [dataToSend, setDataToSend] = useState({
    title: "",
    aboutMe: "",
    aboutYou: "",
  });

  const [arrayUrlImages, setArrayUrlImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = (event) => {
    //console.log("==>",event.target.files);
    const files = event.target.files;
    //console.log("files=>",Array.from(files));
    const filesArray = Array.from(files);
    const arrayTemp = [];
    if (arrayUrlImages.length >= 5) {
      return alert("No puedes subir mas de 5 fotos PRIMERO");
    }

    if (filesArray.length > 5) {
      return alert("No puedes subir mas de 5 fotos");
    }

    if (filesArray.length) {
      for (let file of filesArray) {
        const previewURL = URL.createObjectURL(file);
        arrayTemp.push(previewURL);
      }
      setArrayUrlImages([...arrayUrlImages, ...arrayTemp]);
    }
  };
  const [renderArray, setRenderArray] = useState(false);

  useEffect(() => {
    // Limpia la URL temporal al desmontar el componente o cuando cambia la imagen
    /*     return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    }; */
  }, [arrayUrlImages]);

  useEffect(() => {
    setArrayUrlImages(arrayUrlImages);
  }, [renderArray]);

  const handleDeleteByIdx = async (idx) => {
    arrayUrlImages.splice(idx, 1);
    setRenderArray(!renderArray);
    // setArrayUrlImages(arrayUrlImages);
  };

  return (
    <div className="mt-[30px] mb-[130px] sm:mt-[65px] flex flex-col gap-5 relative">
      <section className="flex justify-center ">
        <div className="rounded-full border-8 border-myColorBlack-500 w-[250px] h-[250px] overflow-hidden ">
          <Image src={"/assets/catProfileDefault.jpeg"} width={250} height={250} alt="Profile avatar default" />
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <div>
          <h1 className="text-4xl sm:text-6xl text-myColorBlack-500 dark:text-myColorWhite-500 text-center">Juanito Arcoiris</h1>
        </div>
        <div className="flex flex-col items-center mt-[50px]">
          <div className="w-[90%] flex flex-col gap-10">
            <TextArea titleTextArea="Un titulo increible" maxLength={100} name="title" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataToSend={setDataToSend} setDataChanged={setDataChanged} />
            <TextArea titleTextArea="Sobre mi" maxLength={250} name="aboutMe" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataToSend={setDataToSend} setDataChanged={setDataChanged} />
            <TextArea titleTextArea="Lo que espero de ti" maxLength={250} name="aboutYou" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataToSend={setDataToSend} setDataChanged={setDataChanged} />
          </div>
        </div>
      </section>
      <section className="flex justify-center flex-col w-[90%] self-center gap-2">
        <div>
          <span className="text-myColorBlack-500 dark:text-myColorWhite-500 text-sm sm:text-base">Sube tus mejores fotos :</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-between w-[80%] self-center">
          <div className=" ">
            <div className="relative  w-[120px] h-[120px]">
              <input type="file" accept="image/*" onChange={handleFileUpload} multiple className="absolute  z-10 w-full h-full opacity-0 cursor-pointer" disabled={arrayUrlImages.length >= 5} />
              <div className="border w-full h-full absolute rounded border-myColorBlack-500 dark:border-myColorWhite-500 border-dashed flex items-center justify-center">
                <Image src={"/assets/uploadImage.png"} width={100} height={100} alt="Icon Upload Photo" />
              </div>
            </div>
            <span className="text-myColorBlack-500 dark:text-myColorWhite-500">{arrayUrlImages.length}/5</span>
          </div>
          {arrayUrlImages.map((image, idx) => {
            return <ImageProfile image={image} idx={idx} handleDeleteByIdx={handleDeleteByIdx} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default MyProfile;

// <div className="flex flex-wrap gap-2 justify-between w-[80%] self-center">
//   <div className=" ">
//     <div className="relative  w-[120px] h-[120px]">
//       <input type="file" accept="image/*" onChange={handleFileUpload} multiple className="absolute  z-10 w-full h-full opacity-0 cursor-pointer" />
//       <div className="border w-full h-full absolute rounded border-myColorBlack-500 dark:border-myColorWhite-500 border-dashed flex items-center justify-center">
//         <Image src={"/assets/uploadImage.png"} width={100} height={100} alt="Icon Upload Photo" />
//       </div>
//     </div>
//   </div>
//   {arrayUrlImages.map((image) => {
//     return <ImageProfile image={image} /* setViewImg={setViewImg} viewImg={viewImg} */ />;
//   })}
// </div>
