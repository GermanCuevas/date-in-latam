import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { FirebaseError } from "firebase/app";

export const addUser = onRequest({ cors: true }, async (req: any, res: any) => {
  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }

  const { city, email, gender, name, password, repeatPassword, surname, toKnow } = req.body;
  const { day, month, year } = req.body;

  if (!city.value || !email.value || !name.value || !password.value || !repeatPassword.value || !surname.value || !toKnow.value || !day.value.value || !month.value.value || !year.value.value || !gender.value) {
    return res.send({ error: "Hay campos vacios" }).status(401);
  }

  if (password.value !== repeatPassword.value) {
    return res.send({ error: "Las contraseñas no coinciden" }).status(401);
  }

  const infoUserValues = {
    city: city.value,
    email: email.value,
    gender: gender.value,
    name: name.value,
    surname: surname.value,
    toKnow: toKnow.value,
  };

  let userRecord;
  try {
    userRecord = await admin.auth().createUser({
      email: infoUserValues.email,
      password: password.value,
      displayName: infoUserValues.name + " " + infoUserValues.surname,
    });
  } catch (error) {
    const err = error as FirebaseError;
    console.log("aca ahora");
    console.error("Hubo un error en AUTH ==", err.code);
    if (err?.code === "auth/email-already-exists") {
      console.log("LPMMMMMMMM");
      return res.status(409).send("Este mail ya esta registrado");
    }
  }


  if (userRecord) {
    const userDataToDB = {
      registerFastGoogle: false,
      createdAt: new Date(),
      uid: userRecord.uid,
      fechaNac: {
        day: day.value.value,
        month: month.value.value,
        year: year.value.value,
      },
      ...infoUserValues,
      //info de Google, aca no deberia ir nada, pero lo dejo para tener la misma estructura de DB
      dataLink: {
        linkGoogleAt: null,
        linkedBy: null,
        linked: false,
      },
      loginGoogleData: {
        email: null,
        name: null,
        surname: null,
        imageGoogle: null,
      },
    };
    //await admin.database().ref(`usuarios/${userRecord.uid}`).set(userDataToDB);//realtime database, no esta configurado
    console.log("trying...");
    try {
      await admin.firestore().collection("usuarios").doc(userRecord.uid).set(userDataToDB);
    } catch (err) {
      console.log("Error", err);
      console.log("====================1");
      return res.send("Este mail ya esta registrado").status(409);
    }
    return res.send("Usuario creado con exito").status(201);
  } else {
    console.log("====================2");

    return res.send("Error al crear usuario").status(401);
  }
});

//const cuerpoBody =  {
//   "city": {
//     "value": "Ezeiza, Partido de Ezeiza, Buenos Aires, 1804, Argentina",
//     "red": false,
//     "label": "city"
//   },
//   "day": {
//     "value": {},
//     "red": false,
//     "label": "day"
//   },
//   "email": {
//     "value": "ger@ger33.com",
//     "red": false,
//     "label": "email"
//   },
//   "gender": {
//     "value": {},
//     "red": false,
//     "label": "gender"
//   },
//   "month": {
//     "value": {},
//     "red": false,
//     "label": "month"
//   },
//   "name": {
//     "value": "gerrrr",
//     "red": false,
//     "label": "name"
//   },
//   "password": {
//     "value": "german2",
//     "red": false,
//     "label": "password"
//   },
//   "repeatPassword": {
//     "value": "german2",
//     "red": false,
//     "label": "repeatPassword"
//   },
//   "surname": {
//     "value": "gerdddaaa",
//     "red": false,
//     "label": "surname"
//   },
//   "toKnow": {
//     "value": {},
//     "red": false,
//     "label": "toKnow"
//   },
//   "year": {
//     "value": {},
//     "red": false,
//     "label": "year"
//   }
// }
