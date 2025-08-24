import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const checkUserByEmail = onRequest({ cors: true }, async (req: any, res: any) => {
  console.log("checkUserByEmail invocada");
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Método no permitido, usa POST");
    }

    if (!req.body) {
      return res.status(400).json({ error: "No se recibió body en la request" });
    }

    let email: string;

    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      email = body.email;
    } catch (err) {
      return res.status(400).json({ error: "Formato de body inválido" });
    }

    if (!email) {
      return res.status(400).json({ error: "El campo 'email' es requerido" });
    }

    const snapshot = await admin
      .firestore()
      .collection("usuarios")
      .where("email", "==", email)
      .limit(1) // 🔹 por si hubiera más de un doc (no debería, pero prevenimos)
      .get();

    if (snapshot.empty) {
      return res.status(200).json({ exists: false, user: null });
    }

    const doc = snapshot.docs[0];
    const userData = doc.data();

    console.log("userdata====>",userData)

    if(userData.registerFastGoogle){
      console.log("Existe pero esta bien porque se registro previamente en la DB con google fast")
      return res.status(200).json({ exists: false, user: null });
    }

    return res.status(200).json({
      exists: true,
      id: doc.id, // 🔹 también mandamos el id por si querés usarlo
      user: userData,
    });
  } catch (err) {
    console.error("Error en checkUserByEmail:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});
