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
    userWithoutAuth: true,
    createdAt: new Date(),
    ...infoUserValues,
  };
  

  try {
    const usersRef = admin.firestore().collection("usuarios");
    console.log(infoUserValues)

    await admin.firestore().runTransaction(async (transaction) => {
      const existingUserSnapshot = await transaction.get(usersRef.where("email", "==", email));
console.log("existingUserSnapshot", existingUserSnapshot.empty);
console.log("Docs encontrados:", existingUserSnapshot.docs.length);
existingUserSnapshot.docs.forEach(doc => {
  console.log("Doc ID:", doc.id);
  console.log("Doc data:", doc.data());
});
    if (existingUserSnapshot.empty) {
      const newUserRef = usersRef.doc();
      transaction.set(newUserRef, userDataToDB);
       console.log("Usuario guardado con éxito");
       return res.status(201).send("Este usuario es creado con éxito");
      } else {
        console.log("El usuario ya está guardado");
        return res.status(204).send("El usuario ya está registrado");
      }
    });

  } catch (err) {
    console.error("Catch error en addUserByGoogleAuth :", err);
  }
});
