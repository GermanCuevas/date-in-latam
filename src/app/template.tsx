'use client'
import "./globals.css";
import Header from "../components/Header";
import { usePathname } from "next/navigation";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const pathname = usePathname()
  return (
    <div>
        {pathname !== '/' && <Header />}
        {children}
    </div>
  );
}
