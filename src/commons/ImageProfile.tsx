import Image from "next/image";
import { useState } from "react";
import { XCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
//import { useRef } from "react";

const ImageProfile = ({ image, idx,  handleDeleteByIdx }) => {
  const [viewImg, setViewImg] = useState(false);

  console.log(idx);

  return (
    <>
      {viewImg ? (
        <div className="bg-myColorTransparent-600 w-[90%] h-[95%] fixed left-[5%] z-30 top-[2.5%]">
          <Image src={image} alt="Previsualización" fill sizes="120px" className={`object-contain  absolute`} />
          <XCircleIcon className="size-7 absolute right-2 top-2 text-myColorBlack-500 dark:text-myColorWhite-500 cursor-pointer" onClick={() => setViewImg(false)} />
          <TrashIcon
            className="size-7 right-2 bottom-2 absolute text-myColorRed-500"
            onClick={() => {
              handleDeleteByIdx(idx)
              setViewImg(false);
            }}
          />
        </div>
      ) : (
        <div
          className={`${viewImg ? "w-screen h-screen relative" : "w-[120px] h-[120px] relative"} `}
          onClick={(e) => {
            setViewImg(true);
          }}
        >
          <Image src={image} alt="Previsualización" fill sizes="120px" className={`${viewImg ? "object-contain" : "object-cover"} absolute`} />
        </div>
      )}
    </>
  );
};

export default ImageProfile;
// <div className="bg-vibrant-100 w-[90%] h-[90%] fixed left-[5%] z-30">facil</div>
