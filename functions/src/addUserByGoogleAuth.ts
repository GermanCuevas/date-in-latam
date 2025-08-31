import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

export const addUserByGoogleAuth = onRequest({ cors: true }, async (req: any, res: any) => {
  console.log("req.body con addUserByGoogleAuth", req.body);

  if (!req.body) {
    return res.status(400).send("No hay datos de la sesion");
  }
  const { expires, user } = req.body;
  const { email, image, name } = user;

  console.log("name ===>", name);

  const nameSplit = name.split(" ");
  let firstName = "";
  let surname = "";
  if (nameSplit.length >= 2) {
    firstName = nameSplit[0];
    surname = nameSplit[1];
  }

  console.log("expires", expires);

  //  if(userRecord) {
  //   const userDataToDB = {
  //     uid: userRecord.uid,
  //     fechaNac: {
  //       day: day.value.value,
  //       month: month.value.value,
  //       year: year.value.value,
  //     },
  //     registerFastGoogle: false,
  //     createdAt: new Date(),
  //     ...infoUserValues,
  //   };

  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }

  const infoUserDataToComplete = {
    city: null,
    email,
    gender: null,
    name: firstName,
    surname,
    toKnow: null,
  };

  // const infoUserValues = {
  //   city: city.value,
  //   email: email.value,
  //   gender: gender.value,
  //   name: name.value,
  //   surname: surname.value,
  //   toKnow: toKnow.value,
  // };

  // const infoUserValuesGoogle = {
  //   email,
  //   name: firstName,
  //   surname,
  //   imageGoogle: image,
  // };

  // const userDataToDB = {
  //   registerFastGoogle: true,
  //   createdAt: new Date(),
  //   ...infoUserValues,
  // };
  const userDataToDB = {
    registerFastGoogle: true,
    createdAt: new Date(),
    //el uid se lo asigno despues
    //uid: userRecord.uid,
    fechaNac: {
      day: null,
      month: null,
      year: null,
    },
    ...infoUserDataToComplete,
    dataLink: {
      linkGoogleAt: null,
      linkedBy: null,
      linked: false,
    },
    //info de Google para registro rapido =>
    loginGoogleData: {
      email,
      name: firstName,
      surname,
      imageGoogle: image,
    },
  };

  const userDataToDBWithLink = {
    dataLink: {
      linkGoogleAt: new Date(),
      linkedBy: "google",
      linked: true,
    },
    loginGoogleData: {
      email,
      name: firstName,
      surname,
      imageGoogle: image,
    },
  };

  let userRecord;
  try {
    userRecord = await admin.auth().getUserByEmail(email);
    console.log("Usuario ya existe en Auth:", userRecord.uid);
  
    const checkIfIsPasswordProvider = userRecord.providerData.some((p) => p.providerId === "password");

    if (checkIfIsPasswordProvider) {
      console.log("Se procede a linkear mail manual con Google");

      await admin.firestore().collection("usuarios").doc(userRecord.uid).set(userDataToDBWithLink, { merge: true });
      return res.status(202).send("Este mail fue registrado manualmente, se sugiere linkear Google a la cuenta existente");
    }

    if (userRecord && !checkIfIsPasswordProvider) {
      console.log("Este mail fue anteriormente registrado, se procede a loguearse");
      return res.status(201).send("Ingreso existoso");
    }
  } catch (err) {
    console.log("err en catch ", err);
    if ((err as any).code === "auth/user-not-found") {
      console.log("🙆‍♂️1️⃣ Usuario no encontrado, se procede a crearlo en Auth");
      userRecord = await admin.auth().createUser({
        email,
        displayName: `${firstName} ${surname}`,
        photoURL: image,
      });
      console.log("🙆‍♂️2️⃣Usuario creado en Auth con UID:", userRecord.uid);
    }
    console.log("Primera vez que ingresa a loguearse con Google signIn");
    if (userRecord) {
      await admin
        .firestore()
        .collection("usuarios")
        .doc(userRecord.uid)
        .set({ ...userDataToDB, uid: userRecord.uid });
    }
    return res.status(201).send("Ingreso existoso");
  }
});
