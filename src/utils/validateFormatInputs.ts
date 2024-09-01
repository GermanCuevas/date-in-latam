import { Dispatch, SetStateAction } from "react";
import FormFields from "@/types/FormFields";
import { ErrorFieldsForm } from "@/types/ErrorFields";

interface validateFormatInputsInterface {
  dataForm: FormFields;
  setErrorObject: Dispatch<SetStateAction<ErrorFieldsForm>>;
}

const validateFormatInputs = async ({ dataForm, setErrorObject }: validateFormatInputsInterface) => {
  //console.log(dataForm);
  const objMessage: ErrorFieldsForm = {
    email: { message: "" },
    password: { message: "" },
    repeatPassword: { message: "" },
    name: { message: "" },
    surname: { message: "" },
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{6,}$/;
  const nameRegex = /^[^\d]+$/;

  if (dataForm.email && objMessage.email) {
    const email = dataForm["email"].value;
    if (!emailRegex.test(email)) objMessage.email.message = "El email no es válido.";
  }

  if (dataForm.password && objMessage.password) {
    const password = dataForm["password"]?.value;
    if (!passwordRegex.test(password)) objMessage.password.message = "Password: mínimo 6 caracteres y un número.";
  }

  if (dataForm.repeatPassword && objMessage.repeatPassword) {
    const password = dataForm["password"]?.value;
    const repeatPassword = dataForm["repeatPassword"]?.value;
    if (password !== repeatPassword) objMessage.repeatPassword.message = "Las contraseñas no coinciden.";
  }

  if (dataForm.name && objMessage.name) {
    const name = dataForm["name"]?.value;
    if (!nameRegex.test(name)) objMessage.name.message = "No debe contener números.";
  }

  if (dataForm.surname && objMessage.surname) {
    const surname = dataForm["surname"]?.value;
    if (!nameRegex.test(surname)) objMessage.surname.message = "No debe contener números.";
  }

  setErrorObject(objMessage);

  if (objMessage.email?.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, email: {  message: "" } }));
    }, 3000);
  }
  if (objMessage.password?.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, password: { message: "" } }));
    }, 3000);
  }
  if (objMessage.repeatPassword?.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, repeatPassword: { message: "" } }));
    }, 3000);
  }
  if (objMessage.name?.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, name: { message: "" } }));
    }, 3000);
  }
  if (objMessage.surname?.message) {
    setTimeout(() => {
      setErrorObject((prev) => ({ ...prev, surname: { message: "" } }));
    }, 3000);
  }
};

export default validateFormatInputs;
