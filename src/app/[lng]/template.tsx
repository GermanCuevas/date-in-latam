"use client";
import "./globals.css";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SelectLanguaje from "@/components/SelectLanguaje";
import Menu from "@/components/Menu";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [lng, setLanguage] = useState<string>("");
  const [menu, setMenu] = useState(false);
  
  useEffect(() => {
    const lang = document.documentElement.lang;
    setLanguage(lang);
  }, []);

  return (
    <>
      {pathname !== "/es" && pathname !== "/es/login" && pathname !== "/es/register" && pathname !== "/en" && pathname !== "/en/login" && pathname !== "/en/register" && <Header menu={menu} setMenu={setMenu} />}
      {(pathname === "/es" || pathname === "/es/login" || pathname === "/es/register" || pathname === "/en" || pathname === "/en/login" || pathname === "/en/register") && <SelectLanguaje lng={lng} />}
      {menu && <Menu menu={menu} setMenu={setMenu} />}
      {children}
    </>
  );
}
