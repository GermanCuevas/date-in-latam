import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

export const addUserByGoogleAuth = onRequest({ cors: true }, async (req: any, res: any) => {
  console.log("req.body con addUserByGoogleAuth", req.body);

  if (!req.body) {
    return res.status(400).send("No hay datos de la sesion");
  }
  const { expires, user } = req.body;
  const { email, image, name } = user;

  const nameSplit = name.split(" ");
  let firstName = "";
  let surname = "";
  if (nameSplit.length >= 2) {
    firstName = nameSplit[0];
    surname = nameSplit[1];
  }

  console.log("expires", expires);

  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }

  const infoUserValues = {
    email,
    name: firstName,
    surname,
    imageGoogle: image,
  };
  const userDataToDB = {
    createdAt: new Date(),
    ...infoUserValues,
  };

  try {
    const usersRef = admin.firestore().collection("usuarios");

    await admin.firestore().runTransaction(async (transaction) => {
      const existingUserSnapshot = await transaction.get(usersRef.where("email", "==", email));

      if (!existingUserSnapshot.empty) {
        console.log("El usuario ya existe en la base de datos");
        throw new Error("El usuario ya está registrado");
      }

      const newUserRef = usersRef.doc();
      transaction.set(newUserRef, userDataToDB);
    });

    console.log("Usuario creado con éxito");
    return res.status(201).send("Este usuario es creado con éxito");
  } catch (err) {
    if (err == "Error: El usuario ya está registrado") {
      return res.status(409).send("El usuario ya está registrado");
    }
  }
  return res.status(201).send("Usuario creado con exito en 201");
});
