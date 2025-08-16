

import Button from "./Button";

const ModalToSignOut = () => {
  return (
    <div className="shadow-2xl absolute border-4 border-myWhiteColor-600 z-50 top-[45%] left-[50%] w-[240px] ml-[-120px] bg-secondary-700 flex flex-col justify-center items-center py-4 gap-y-2 rounded">
      <p className="text-sm sm:text-base">CERRAR SESION</p>
      <div className="flex gap-x-4">
        {/*  <Button text="Si" type="button" handleFunctionWithoutParam={handleActionToDelete} variant="primary" onWith40px={true} fontSize="normal" to="" />
        <Button text="No" type="button" handleFunction={() => setShowNotification(false)} variant="primary" onWith40px={true} fontSize="normal" to="" /> */}
      </div>
    </div>
  );
};

export default ModalToSignOut;
