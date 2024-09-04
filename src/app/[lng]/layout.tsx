import type { Metadata } from "next";
import { Lato } from "next/font/google";
import FloatBtn from "../../components/FloatBtn";
import Version from "@/components/Versions";
import {dir} from 'i18next'
import {languages} from "../i18n/settings" 
import SelectLanguaje from "@/components/SelectLanguaje";
//import Image from "next/image";

//const languages = ["en", "es"];

export async function generateStaticParams() {
  return languages.map((lng) => {
    lng;
  });
}

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
//className="flex items-center justify-center relative h-screen "

// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>
// Define la interfaz para los parámetros que esperas recibir
interface Params {
  lng: string;
}

// Define la interfaz para las props del componente
interface RootLayoutProps {
  children: React.ReactNode;
  params: Params;
}
export default function RootLayout({ children, params: { lng } }: RootLayoutProps) {
  console.log("lng en root layout=>",lng);
  
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${lato.className} bg-myColorWhite-500 dark:bg-myColorBlack-600  `}>
        {children}
        <FloatBtn />
        <Version />
      </body>
    </html>
  );
}
//bg-gradientLight dark:bg-gradientDark h-full
