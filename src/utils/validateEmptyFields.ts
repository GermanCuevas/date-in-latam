// const validationFields = async(dataForm, setDataForm) => {
//   //para evitar problemas con el renderizado y la actualizacion de los valores, creamos una copia del objeto dataForm =>
//   let newDataForm = { ...dataForm };

//   for (let key in newDataForm) {
//     if (newDataForm[key].value === "") {
//       newDataForm[key] = { ...newDataForm[key], red: true };
//     }
//   }
//   setDataForm(newDataForm);
//   //el siguiente setTimeout es para volver a pasar a false los campos red
//   setTimeout(() => {
//     for (let key in newDataForm) {
//       if (newDataForm[key].value === "") {
//         newDataForm[key] = { ...newDataForm[key], red: false };
//       }
//     }
//     setDataForm({ ...newDataForm });
//   }, 1000);
// };

// export default validationFields;

const validateEmptyFields = async (setDataForm) => {
  let notSendSubmit = false;
  //Utilizamos el await en la el siguiente set... para asegurarnos de que el boolean notSendSubmit se actualice antes de que el return sea ejecutado
  await setDataForm(prevDataForm => {
    const updatedDataForm = {};
    for (let key in prevDataForm) {
      const isRed = prevDataForm[key].value === "";
      updatedDataForm[key] = {
        ...prevDataForm[key],
        red: isRed,
      };
      // Si algún campo se pone rojo, establecemos notSendSubmit a true
      if (isRed) {
        notSendSubmit = true;
      }
    }
    return updatedDataForm;
  });

  setTimeout(() => {
    setDataForm(prevDataForm => {
      const resetDataForm = {};
      for (let key in prevDataForm) {
        resetDataForm[key] = {
          ...prevDataForm[key],
          red: false,
        };
      }
      return resetDataForm;
    });
  }, 1000);

  return notSendSubmit;
};

export default validateEmptyFields;
