import { NextRequest, NextResponse } from "next/server";
import { authAdmin } from "@/lib/firebaseAdmin";
import { setLoginSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token } = body;

  if (!token) return NextResponse.json({ error: "Token missing" }, { status: 400 });

  try {
    // Verificar token con Firebase Admin
    const decodedToken = await authAdmin.verifyIdToken(token);

    const user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email,
    };

    // Crear cookie de NextAuth
    const response = NextResponse.json({ ok: true });
    await setLoginSession(response, user);

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
