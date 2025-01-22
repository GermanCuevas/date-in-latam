import { useEffect, useState } from "react";

const CmOrFt = ({ valueFt, valueCm , handleChangeCm , handleChangeFt }) => {
  //console.log("heighType======>", heightType);
  //const [isHereHeightType, setIsHereHeightType] = useState(heightType);
 // console.log("valueCm en COMPONENTEEEE =>", valueCm);
 // console.log("!valueFt en COMPONENTEEEE =>", !valueFt);
  return (
    <div className="flex gap-x-5">
      <div className="text-myColorBlack-500 dark:text-myColorWhite-500 flex gap-x-2">
        <label htmlFor="cm">Cm</label>
        <input type="radio" id="cm" checked={valueCm} onChange={handleChangeCm} />
      </div>
      <div className="text-myColorBlack-500 dark:text-myColorWhite-500 flex gap-x-2">
        <label htmlFor="ft">Ft</label>
        <input type="radio" id="ft" checked={valueFt} onChange={handleChangeFt} />
      </div>
    </div>
  );
};

export default CmOrFt;
