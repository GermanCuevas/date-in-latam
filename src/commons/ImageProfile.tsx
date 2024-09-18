import Image from "next/image";
import { useEffect, useState } from "react";
import { XCircleIcon, TrashIcon, ArrowLeftEndOnRectangleIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import Notification from "./Notification";
//import { useRef } from "react";

interface Props {
  image: string;
  idx: number;
  handleDeleteByIdx: (idx: number) => void;
  array: Array<string>;
}

const ImageProfile = ({ image, idx, handleDeleteByIdx, array }: Props) => {
  const [viewImgWithObj, setViewImgWithObj] = useState({ show: false });
  const [idxToChangeImg, setIdxToChangeImg] = useState(idx);
  const [showNotification, setShowNotification] = useState(false);

  const handleClickNext = () => {
    setShowNotification(false)
    if (cantScrollImgNext) {
      return;
    }
    setViewImgWithObj({ ...viewImgWithObj, show: false });
    setIdxToChangeImg(idxToChangeImg + 1);
    setViewImgWithObj({ ...viewImgWithObj, show: true });
  };
  const handleClickBack = () => {
    setShowNotification(false)
    if (cantScrollImgBack) {
      return;
    }
    setViewImgWithObj({ ...viewImgWithObj, show: false });
    setIdxToChangeImg(idxToChangeImg - 1);
    setViewImgWithObj({ ...viewImgWithObj, show: true });
  };

  const [cantScrollImgNext, setCantScrollImgNext] = useState(false);
  const [cantScrollImgBack, setCantScrollImgBack] = useState(false);

  useEffect(() => {
    if (array.indexOf(array[idxToChangeImg]) === array.length - 1 /* || array.indexOf(array[idxToChangeImg]) === -1 */) {
      setCantScrollImgNext(true);
    } else {
      setCantScrollImgNext(false);
    }
    if (array.indexOf(array[idxToChangeImg]) === 0) {
      setCantScrollImgBack(true);
    } else {
      setCantScrollImgBack(false);
    }
  }, [array[idxToChangeImg]]);

  const handleActionToDelete = () => {
    handleDeleteByIdx(idx);
    setViewImgWithObj({ ...viewImgWithObj, show: false });
  };

  if (viewImgWithObj?.show) {
    return (
      <div>
        <div className="bg-myColorTransparent-600 w-[90%] h-[95%] fixed left-[5%] z-30 top-[2.5%]">
          <Image src={array[idxToChangeImg]} alt="Previsualización" fill sizes="120px" className={`object-contain  absolute`} />
          <XCircleIcon
            className="size-7 absolute right-2 top-2 text-myColorBlack-500 dark:text-myColorWhite-500 cursor-pointer"
            onClick={() => {
              setShowNotification(false)
              setViewImgWithObj({ ...viewImgWithObj, show: false });
              setIdxToChangeImg(0);
            }}
          />
          <TrashIcon className="size-7 right-2 bottom-2 absolute text-myColorRed-500 cursor-pointer" onClick={() => setShowNotification(true)} />
          <div className="absolute text-myColorBlack-500 bottom-0 w-[100px] bg-gray-50 flex justify-center left-[50%] ml-[-50px]">
            <div className="text-myColorBlack-500 cursor-pointer absolute left-0" onClick={handleClickBack}>
              <ArrowLeftEndOnRectangleIcon className="size-6" />
            </div>
            <span>{`${idxToChangeImg + 1}/ ${array.length}`}</span>
            <div className="text-myColorBlack-500 cursor-pointer absolute right-0" onClick={handleClickNext}>
              <ArrowRightEndOnRectangleIcon className="size-6" />
            </div>
          </div>
          {showNotification ? <Notification setShowNotification={setShowNotification} handleActionToDelete={handleActionToDelete} /> : ""}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={"w-[120px] h-[120px] relative cursor-pointer"}
        onClick={() => {
          setViewImgWithObj({ show: true });
          setIdxToChangeImg(idx);
        }}
      >
        <Image src={image} alt="Previsualización" fill sizes="120px" className={"object-cover absolute"} />
      </div>
    </>
  );
};

export default ImageProfile;
// <div className="bg-vibrant-100 w-[90%] h-[90%] fixed left-[5%] z-30">facil</div>
