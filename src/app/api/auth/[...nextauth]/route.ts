// import NextAuth , { DefaultSession } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { NextAuthOptions } from "next-auth";


// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }


// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub as string;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Asegúrate de definir esta variable en tu .env
// };

// // 👇 EXPORTA NextAuth usando `handlers`
// const handler = NextAuth(authOptions);

// // ✅ Debes exportar explícitamente los métodos HTTP permitidos
// export { handler as GET, handler as POST };




import NextAuth , { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    id_token?: string;  // 👈 extendemos para incluir id_token
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Cuando se hace login por primera vez
      if (account) {
        token.id_token = account.id_token;       // 👈 guardás id_token en el JWT interno
        // ojo: si no lo usás, no guardes access_token ni refresh_token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      if (token.id_token) {
        session.id_token = token.id_token as string; // 👈 exponés id_token en session
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
