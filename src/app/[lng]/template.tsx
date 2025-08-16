"use client";
import "./globals.css";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SelectLanguaje from "@/components/SelectLanguaje";
import Menu from "@/components/Menu";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { infoUser } from "@/store/infoUser";
import { useSession } from "next-auth/react";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [lng, setLanguage] = useState<string>("");
  const [menu, setMenu] = useState<boolean>(false);
  const setImgUserToNavbar = infoUser((state) => state.setImgUserToNavbar);
  const imgUserToNavbar = infoUser((state) => state.imgUserToNavbar); // 👈 leer valor

  const { data: session, status } = useSession();
  console.log("Session:", session?.user.image);
  console.log("Status:", status);

  useEffect(() => {
    const lang = document.documentElement.lang;
    setLanguage(lang);
  }, []);

  useEffect(() => {
    if (session?.user.image) {
      setImgUserToNavbar(session?.user.image);
    }
  }, [session?.user]); // 👈 log cuando cambie


  useEffect(() => {
    console.log("Valor actual en Zustand:", imgUserToNavbar);
  }, [imgUserToNavbar]); // 👈 log cuando cambie

  return (
    <>
      {pathname !== "/es" && pathname !== "/es/login" && pathname !== "/es/register" && pathname !== "/en" && pathname !== "/en/login" && pathname !== "/en/register" && <Header menu={menu} setMenu={setMenu} />}
      {(pathname === "/es" || pathname === "/es/login" || pathname === "/es/register" || pathname === "/en" || pathname === "/en/login" || pathname === "/en/register") && <SelectLanguaje lng={lng} />}
      {menu && <Menu setMenu={setMenu} />}
      {children}
    </>
  );
}
