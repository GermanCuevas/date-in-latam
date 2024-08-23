"use client";
import "./globals.css";
import Header from "../components/Header";
import { usePathname } from "next/navigation";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <>
      {(pathname !== "/" && pathname !== "/login" && pathname !== "/register") && <Header />}
      {children}
    </>
  );
}
