"use client";
import "./globals.css";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectLanguaje from "@/components/SelectLanguaje";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [lng, setLanguage] = useState<string | null>(null);
  useEffect(() => {
    const lang = document.documentElement.lang;
    setLanguage(lang);
  }, []);

  return (
    <>
      {pathname !== "/es" && pathname !== "/es/login" && pathname !== "/es/register" && pathname !== "/en" && pathname !== "/en/login" && pathname !== "/en/register" && <Header />}
      {(pathname === "/es" || pathname === "/es/login" || pathname === "/es/register" || pathname === "/en" || pathname === "/en/login" || pathname === "/en/register") && <SelectLanguaje lng={lng} />}
      {children}
    </>
  );
}
