//"use client"
import Image from "next/image";
import BoxRoot from "../../components/BoxRoot";
import "./globals.css";

//import { useTranslation } from "../i18n"; //server

//import {useTranslation} from "../i18n/client.js" //client

//className="flex items-center justify-center relative h-screen"

type HomeProps = {
  params: {
    lng: string; // Define 'lng' as a string
  };
};

export default async function Home({ params: { lng } }: HomeProps) {
  // console.log("lng ==>", lng);
  // console.log("useTranslation =>", useTranslation);
  // const { t:traductor } = await useTranslation(lng, "about")
  const bg = "bg-gradientLight dark:bg-gradientDark";

  return (
    <div className={`flex items-center justify-center relative h-screen ${bg} `}>
      <div className="flex flex-col gap-24 sm:gap-16 items-center">
        <Image src="/assets/LogoDate.svg" width={275} height={161} alt="Data in latam Logo" className="sm:w-[339px] sm:h-[203px]" />
        <BoxRoot lng={lng} />
      </div>
    </div>
  );
}
//<main className="flex items-center justify-center relative h-screen "></main>
//</main>
//339
//203
