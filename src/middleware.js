import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import { getToken } from "next-auth/jwt";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)"],
};

const checkPublicAndProtectedRoutes = (pathname, lng) => {};

export async function middleware(req) {
  let lng;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) && !req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response; //devolver siempre
  }

  //PARTE DE PROTECCION DE RUTAS ABAJO
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Rutas públicas donde SÍ puede entrar un usuario no autenticado
  // ✅ Definimos las rutas "públicas", es decir, a las que se puede acceder sin estar logueado.
  const publicRoutes = [`/${lng}/login`, `/${lng}/register`, `/${lng}`];
  // 👉 Estas rutas están disponibles para todos, incluso sin sesión activa.
  console.log("xxxxx PATHNAME:", pathname);
  // 📌 Verificamos si la ruta actual (pathname) es una de las públicas
  const isPublicRoute = publicRoutes.some((route) => {
    console.log(pathname, "---", route);
    console.log(pathname === route);
    return pathname === route;
  });
  console.log("=========verificando si la ruta es pública:", isPublicRoute);
  // 👉 Aquí usamos `.some()` para comparar si la ruta actual comienza con alguna de las rutas públicas.
  // Ejemplo:
  //   pathname = "/es/login"
  //   publicRoutes = ["/es/login", "/es/register"]
  //   Resultado: true si coincide con alguna
  //
  // Si es true, significa que estamos en una ruta pública y **no necesitamos sesión** para acceder.

  // 🚫 Si el usuario NO tiene sesión y la ruta NO es pública, lo redirigimos a login

  console.log("Token in Middleware:", token);
  // console.log("Token pic", token.picture);
  // console.log("Is Public Route:", isPublicRoute);
  // if (token) {
  //   const response = NextResponse.next();
  //   if (token?.picture) {
  //     console.log("Guardando en token en cookies...");
  //     response.cookies.set("imgUserToNavbar", token.picture, {
  //       path: "/", // accesible en toda la app
  //     });
  //   }
  //   return response; //devolver siempre
  // }
  // if (!token) {
  //   const response = NextResponse.next();
  //   console.log("Borrando cookie imgUserToNavbar...");
  //   response.cookies.delete("imgUserToNavbar", {
  //     path: "/", // aseguramos que sea la misma ruta
  //   });
  //   return response;
  // }

  console.log("verificando...lo redirigimos a login?", !token && !isPublicRoute);
  if (!token && !isPublicRoute) {
    console.log("Redirigiendo a / ...");
    return NextResponse.redirect(new URL(`/${lng}`, req.url));
  }

  //console.log("verificando...lo redirigimos a home?", token && isPublicRoute);
  // 🔄 Si el usuario SÍ tiene sesión y está intentando acceder a login o register, lo redirigimos al home
  if (token && isPublicRoute) {
    console.log("Redirigiendo a home...");
    return NextResponse.redirect(new URL(`/${lng}/welcome`, req.url));
  }
  // 👉 Esta línea evita que un usuario ya autenticado acceda a páginas como login o register.
  // Por ejemplo, si está logueado y trata de entrar a "/es/login", lo mandamos a la home "/es/".

  return NextResponse.next();
}

// Opción 2: Si necesitás más flexibilidad (por ejemplo, /es/login/step2), podrías hacer:
// const isPublicRoute = publicRoutes.some((route) =>
//   pathname === route || pathname.startsWith(`${route}/`)
// );
