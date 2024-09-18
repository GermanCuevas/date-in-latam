"use client";
import Image from "next/image";
import { useEffect, ChangeEvent, useState } from "react";
import TextArea from "@/commons/TextArea";
import ImageProfile from "@/commons/ImageProfile";
import FormSetPreferences from "@/components/FormSetPreferences";

interface interfaceState {
  title: string;
  aboutMe: string;
  aboutYou: string;
}

const fakeData = {
  title: "titulo ejemplo",
  aboutMe: "",
  aboutYou: "",
};

const MyProfile = () => {
  //para el input text-5xl
  const [dataFromBack, setDataFromBack] = useState<interfaceState>(fakeData);
  const [dataChanged, setDataChanged] = useState<interfaceState>(fakeData);
  const [dataToSend, setDataToSend] = useState({
    title: "",
    aboutMe: "",
    aboutYou: "",
  });

  // const [arrayUrlImages, setArrayUrlImages] = useState([]);
  // const [tempUrls, setTempUrls] = useState([]);

  const [arrayUrlImages, setArrayUrlImages] = useState<string[]>([]);
  const [tempUrls, setTempUrls] = useState<string[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const arrayTemp: Array<string> = [];
      if (arrayUrlImages.length >= 5) {
        return alert("No puedes subir mas de 5 fotos PRIMERO");
      }
      if (filesArray.length > 5) {
        return alert("No puedes subir mas de 5 fotos");
      }
      if (filesArray.length) {
        for (let file of filesArray) {
          const previewURL = URL.createObjectURL(file as Blob);
          arrayTemp.push(previewURL);
        }
        setArrayUrlImages([...arrayUrlImages, ...arrayTemp]);
        setTempUrls((prevUrls) => [...prevUrls, ...arrayTemp]);
      }
    }
  };

  /*   useEffect(() => {
    return () => {
      // Limpia las URLs temporales
      tempUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [tempUrls]); */

  const handleDeleteByIdx = async (idx: number) => {
    const updatedArray = arrayUrlImages.filter((_, index) => index !== idx);
    const updatedTempUrls = tempUrls.filter((_, index) => index !== idx);
    setArrayUrlImages(updatedArray);
    setTempUrls(updatedTempUrls);
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
            <TextArea titleTextArea="Un titulo increible" maxLength={100} name="title" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataChanged={setDataChanged} />
            <TextArea titleTextArea="Sobre mi" maxLength={250} name="aboutMe" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataChanged={setDataChanged} />
            <TextArea titleTextArea="Lo que espero de ti" maxLength={250} name="aboutYou" setDataFromBack={setDataFromBack} dataFromBack={dataFromBack} dataChanged={dataChanged} setDataChanged={setDataChanged} />
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
          {arrayUrlImages.map((image, idx, array) => {
            return <ImageProfile key={`${idx}-${image}`} image={image} idx={idx} handleDeleteByIdx={handleDeleteByIdx} array={array} />;
          })}
        </div>
      </section>
      <section className="flex justify-center">
        <FormSetPreferences />
      </section>
    </div>
  );
};

export default MyProfile;
