// Se encarga de manejar login con providers (Google, GitHub, credenciales, etc.).

// Te crea y mantiene cookies seguras (HTTPOnly).

// Te da hooks como useSession() y funciones como getServerSession().

import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/firebase";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    id_token?: string; // 👈 extendemos para incluir id_token
  }
}

export const authOptions: NextAuthOptions = {
  //provider Google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
//provider manual (credenciales)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials?.email!, credentials?.password!);
          const user = userCredential.user;
          return { id: user.uid, email: user.email }; // lo que quieras guardar en session
        } catch (err) {
          console.error("Error en login con credenciales", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Cuando se hace login por primera vez
      if (account) {
        token.id_token = account.id_token; // 👈 guardás id_token en el JWT interno
        // ojo: si no lo usás, no guardes access_token ni refresh_token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      if (token.id_token) {
        session.id_token = token.id_token as string; // 👈 exponés id_token en session , esto se hace para linkear el usuario manual con Google si hace falta
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// 👇 EXPORTA NextAuth usando `handlers`
const handler = NextAuth(authOptions);

// ✅ Debes exportar explícitamente los métodos HTTP permitidos
export { handler as GET, handler as POST };
