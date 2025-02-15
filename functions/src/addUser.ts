import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

export const addUser = onRequest(async (req, res) => {
  console.log(req.body);
  
  console.log(admin.firestore);
  console.log("se ejecuta addUser");
  
  // Solo permitimos POST
  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }

  const { city, email, gender, name, password, repeatPassword, surname, toKnow } = req.body;
  const { day, month, year } = req.body;

  if (!city || !email || !name || !password || !repeatPassword || !surname || !toKnow || !day || !month || !year || !gender) {
    return res.send({ error: "Faltan uno o mas campos" }).status(400);
  }

  if (password !== repeatPassword) {
    return res.send({ error: "Las contraseñas no coinciden" }).status(401);
  }

  const infoUser = { city, email, gender, name, password, repeatPassword, surname, toKnow };

  const userRecord = await admin.auth().createUser({
    email,
    password,
    displayName: name + " " + surname,
  });

  const userData = {
    uid: userRecord.uid,
    fechaNac: {
      day,
      month,
      year,
    },
    createdAt: new Date(),
    ...infoUser,
  };

  console.log("userRecord", userRecord);

  await admin.database().ref(`usuarios/${userRecord.uid}`).set(userData);

  return res.send("Usuario creado con exito").status(201);
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
