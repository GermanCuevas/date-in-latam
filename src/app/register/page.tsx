import FormRegister from "@/components/FormRegister";
import ArrowBack from "@/components/ArrowBack";

const Register = () => {
  return (
    <div className="flex items-center justify-center relative sm:h-screen bg-gradientLight dark:bg-gradientDark pt-20 sm:pt-0 pb-20 sm:pb-0">
      <FormRegister />
      <ArrowBack />
    </div>
  );
};

export default Register;
