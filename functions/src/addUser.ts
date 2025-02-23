import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

export const addUser = onRequest({ cors: true }, async (req: any, res: any) => {
  console.log("req.body funcional", req.body);
  // Solo permitimos POST
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

  // Convert FormFields to object
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
    console.error("Hubo un error en AUTH",error);
  }

  if(userRecord) {
    const userDataToDB = {
      uid: userRecord.uid,
      fechaNac: {
        day: day.value.value,
        month: month.value.value,
        year: year.value.value,
      },
      createdAt: new Date(),
      ...infoUserValues,
    };
    //await admin.database().ref(`usuarios/${userRecord.uid}`).set(userDataToDB);//realtime database, no esta configurado
    try {
      await admin.firestore().collection("usuarios").doc(userRecord.uid).set(userDataToDB);
    } catch (err) {
      console.log("Error", err);
    }
    return res.send("Usuario creado con exito").status(201);
  }else{
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
