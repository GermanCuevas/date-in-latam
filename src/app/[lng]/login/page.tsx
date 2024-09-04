import Form from "@/components/Form";
import ArrowBack from "@/components/ArrowBack";

const Login = () => {
  return (
    <div className="flex items-center justify-center relative h-screen bg-gradientLight dark:bg-gradientDark">
      <Form />
      <ArrowBack />
    </div>
  );
};

export default Login;
