const validationFields = (dataForm, setDataForm) => {
  //para evitar problemas con el renderizado y la actualizacion de los valores, creamos una copia del objeto dataForm =>
  let newDataForm = { ...dataForm };

  for (let key in newDataForm) {
    if (newDataForm[key].value === "") {
      newDataForm[key] = { ...newDataForm[key], red: true };
    }
  }
  setDataForm(newDataForm);
  //el siguiente setTimeout es para volver a pasar a false los campos red
  setTimeout(() => {
    for (let key in newDataForm) {
      if (newDataForm[key].value === "") {
        newDataForm[key] = { ...newDataForm[key], red: false };
      }
    }
    setDataForm({ ...newDataForm });
  }, 2000);
};

export default validationFields;
