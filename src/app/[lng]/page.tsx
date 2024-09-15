// //"use client"
// import Image from "next/image";
// import BoxRoot from "../../components/BoxRoot";
// import "./globals.css";
// //import { useTranslation } from "../i18n"; //server
// //import {useTranslation} from "../i18n/client.js" //client
// //className="flex items-center justify-center relative h-screen"

// type HomeProps = {
//   params: {
//     lng: string; // Define 'lng' as a string
//   };
// };

// export default async function Home({ params: { lng } }: HomeProps) {
//   const bg = "bg-gradientLight dark:bg-gradientDark";

//   return (
//     <div className={`flex items-center justify-center relative  min-h-[100vh] ${bg}`}>
//       <div className="flex flex-col gap-24 sm:gap-16 items-center">
//         <Image src="/assets/LogoDate.svg" width={275} height={161} alt="Data in latam Logo" className="sm:w-[339px] sm:h-[203px]" />
//         <BoxRoot lng={lng} />
//       </div>
//     </div>
//   );+
// }

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import BoxRoot from "../../components/BoxRoot";
import "./globals.css";

type HomeProps = {
  params: {
    lng: string;
  };
};

export default function Home({ params: { lng } }: HomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    // Set the height on component mount
    updateHeight();

    // Update the height on window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const bg = "bg-gradientLight dark:bg-gradientDark";

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center relative ${bg}`}
    >
      <div className="flex flex-col gap-24 sm:gap-16 items-center">
        <Image
          src="/assets/LogoDate.svg"
          width={275}
          height={161}
          alt="Data in latam Logo"
          className="sm:w-[339px] sm:h-[203px]"
        />
        <BoxRoot lng={lng} />
      </div>
    </div>
  );
}
