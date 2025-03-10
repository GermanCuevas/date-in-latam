import NextAuth , { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}


const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de definir esta variable en tu .env
};

// 👇 EXPORTA NextAuth usando `handlers`
const handler = NextAuth(authOptions);

// ✅ Debes exportar explícitamente los métodos HTTP permitidos
export { handler as GET, handler as POST };




