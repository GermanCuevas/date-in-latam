import { Dispatch, SetStateAction } from "react";
import FormFields from "@/types/FormFields";
interface validateEmptyFieldsInterface {
  setDataForm: Dispatch<SetStateAction<FormFields>>;
}

const validateEmptyFields = async ({ setDataForm }: validateEmptyFieldsInterface) => {
  let notSendSubmit = false;

  setDataForm((prevDataForm) => {
    const updatedDataForm = { ...prevDataForm }; // Crea una copia para no mutar directamente el estado.

    for (let key in updatedDataForm) {
      const typedKey = key as keyof FormFields;
      const field = updatedDataForm[typedKey];

      if (field) {
        // Asegúrate de que el campo no sea undefined
        if (typeof field.value === "string" && field.value === "") {
          if (field.hasOwnProperty("red")) {
            field.red = true;
          }
        } else if (typeof field.value === "object" && field.value?.value === "") {
          if (field.hasOwnProperty("red")) {
            field.red = true;
          }
        }
      }
    }

    return updatedDataForm; // Devuelve la copia actualizada
  });

  setTimeout(() => {
    setDataForm((prevDataForm) => {
      for (let key in prevDataForm) {
        const typedKey = key as keyof FormFields;
        const field = prevDataForm[typedKey];

        if (field) {
          // Asegúrate de que el campo no sea undefined
          if (typeof field.value === "string" && field.red) {
            if (field.hasOwnProperty("red")) {
              field.red = false; // Modificación directa
            }
          } else if (typeof field.value === "object" && field.red) {
            if (field.hasOwnProperty("red")) {
              field.red = false; // Modificación directa
            }
          }
        }
      }
      return prevDataForm; // Se devuelve el mismo objeto modificado
    });
  }, 2000);

  return notSendSubmit;
};

export default validateEmptyFields;

// const validateEmptyFields = async ({ setDataForm }: validateEmptyFieldsInterface) => {
//   let notSendSubmit = false;
//   //Utilizamos el await en la el siguiente set... para asegurarnos de que el boolean notSendSubmit se actualice antes de que el return sea ejecutado
//   setDataForm((prevDataForm) => {
//     const updatedDataForm: FormFields = {};
//     for (let key in prevDataForm) {
//       const typedKey = key as keyof FormFields;
//       //const field = prevDataForm[typedKey];
//       //console.log("000000===>",prevDataForm[key].value);
//       //if (key) {
//       //if (!field) continue;
//       //console.log("acaaa??????????", typeof prevDataForm[typedKey]?.value === "object");

//       /*       function verifiyObjProperties() {
//         if(typeof prevDataForm[typedKey]?.value === "object"){
//           return prevDataForm[typedKey]?.value?.value === ""
//         }
//       } */

//       //let isRed = false;

//       if (typeof prevDataForm[typedKey]?.value === "string") {
//         if (prevDataForm[typedKey]?.value === "") {
//           prevDataForm[typedKey].red = true;
//         }
//       } else if (typeof prevDataForm[typedKey]?.value === "object") {
//         if (prevDataForm[typedKey]?.value?.value === "") {
//           prevDataForm[typedKey].red = true;
//         }
//       }

//       /*     updatedDataForm[typedKey] = {
//         ...prevDataForm[typedKey],
//         red: isRed,
//       }; */

//       /*
//       let temp : inputSelect & InputFieldWithSelect= {
//         ...field,
//         red: isRed,
//       }  */

//       /*  console.log("}}}}}}}}}}}}}}22222==>",     updatedDataForm[typedKey] = temp); */

//       // Si algún campo se pone rojo, establecemos notSendSubmit a true
//       /*       if (isRed) {
//         notSendSubmit = true;
//       } */
//       //}
//     }
//    // return updatedDataForm;
//   });

//   setTimeout(() => {
//     setDataForm((prevDataForm) => {
//       const resetDataForm = {};
//       for (let key in prevDataForm) {
//         resetDataForm[key] = {
//           ...prevDataForm[key],
//           red: false,
//         };
//       }
//       return resetDataForm;
//     });
//   }, 2000);

//   return notSendSubmit;
// };

// export default validateEmptyFields;

// setDataForm((prevDataForm) => {
//   const resetDataForm = {};
//   for (let key in prevDataForm) {
//     resetDataForm[key] = {
//       ...prevDataForm[key],
//       red: false,
//     };
//   }
//   return resetDataForm;
// });
