const validateFormatInputs = async (data, setErrorObject) => {

  const email = data["email"]?.value;
  const password = data["password"]?.value;
  const repeatPassword = data["repeatPassword"]?.value;
  const name = data["name"]?.value;
  const surname = data["surname"]?.value;

  const objMessage = {
    email: { message: "" },
    password: { message: "" },
    repeatPassword: { message: "" },
    name: { message: "" },
    surname: { message: "" },
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{6,}$/;
  const nameRegex = /^[^\d]+$/;

  if (!emailRegex.test(email)) objMessage["email"].message = "El email no es válido.";
  if (!passwordRegex.test(password)) objMessage["password"].message = "Password: mínimo 6 caracteres y un número.";
  if (password !== repeatPassword) objMessage["repeatPassword"].message = "Las contraseñas no coinciden.";
  if (!nameRegex.test(name)) objMessage["name"].message = "No debe contener números.";
  if (!nameRegex.test(surname)) objMessage["surname"].message = "No debe contener números.";

  setErrorObject(objMessage);

  if (objMessage.email.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, email: { message: "" } }));
    }, 3000);
  }
  if (objMessage.password.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, password: { message: "" } }));
    }, 3000);
  }
  if (objMessage.repeatPassword.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, repeatPassword: { message: "" } }));
    }, 3000);
  }
  if (objMessage.name.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, name: { message: "" } }));
    }, 3000);
  }
  if (objMessage.surname.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, surname: { message: "" } }));
    }, 3000);
  }
  const day = data["day"]?.value;
  console.log(day);
  
};

export default validateFormatInputs;
