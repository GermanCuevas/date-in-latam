import FormRegister from "@/components/FormRegister";
import ArrowBack from "@/components/ArrowBack";

const Register = () => {
  return (
    <div className="flex items-center justify-center relative h-screen bg-gradientLight dark:bg-gradientDark ">
      <FormRegister />
      <ArrowBack />
    </div>
  );
};

export default Register;
