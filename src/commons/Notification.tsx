import Button from "./Button";

const Notification = ({ setShowNotification, handleActionToDelete }) => {
  return (
    <div className="shadow-2xl absolute border-4 border-myWhiteColor-600 z-50 top-[45%] left-[50%] w-[240px] ml-[-120px] bg-secondary-700 flex flex-col justify-center items-center py-4 gap-y-2 rounded">
      <p className="text-sm sm:text-base">¿Seguro desea borrar esta foto?</p>
      <div className="flex gap-x-4">
        <Button text="Si" type="button" handleFunction={handleActionToDelete} variant="primary" onWith40px={true} fontSize="normal" />
        <Button text="No" type="button" handleFunction={() => setShowNotification(false)} variant="primary" onWith40px={true} fontSize="normal" />
      </div>
    </div>
  );
};

export default Notification;