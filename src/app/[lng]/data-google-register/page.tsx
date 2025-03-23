import FormCompleteDataGoogle from "@/components/FormCompleteDataGoogle";
import ArrowBack from "@/components/ArrowBack";


const DataGoogleRegister = () => {
  //sm:h-screen se quita esta clase para que el fondo se vea completo , seguir testeando
  return (
    <div className="flex items-center sm:h-screen justify-center relative  bg-gradientLight dark:bg-gradientDark pt-20 sm:pt-0 pb-20 sm:pb-0 " >
      <FormCompleteDataGoogle />
      <ArrowBack />
    </div>
  );
};

export default DataGoogleRegister;