const validateFormatInputs = async (data, setErrorObject) => {
  console.log("data en validate format inputs ==>", data);
  const email = data["email"].value;
  const password = data["password"].value;
  const repeatPassword = data["repeatPassword"].value;
  const name = data["name"].value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{6,}$/;
  const nameRegex = /^[^\d]+$/;

  const objMessage = {
    email: {
      message: "",
    },
    password: {
      message: "",
    },
    repeatPassword: {
      message: "",
    },
    name: { message: "" },
  };

  if (!emailRegex.test(email)) objMessage["email"].message = "El email no es válido";
  if (!passwordRegex.test(password)) objMessage["password"].message = "Password: debe tener mínimo 6 caracteres y un número.";
  if (password !== repeatPassword) objMessage["repeatPassword"].message = "Las contraseñas no coinciden";
  if (!nameRegex.test(name)) objMessage["name"].message = "No debe contener números.";

  setErrorObject(objMessage);

  setTimeout(() => {
    setErrorObject({});
  }, 3000);
};

export default validateFormatInputs;
