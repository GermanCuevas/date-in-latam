"use client";

import Image from "next/image";
import BoxRoot from "../../components/BoxRoot";
import "./globals.css";

type HomeProps = {
  params: {
    lng: string;
  };
};

export default function Home({ params: { lng } }: HomeProps) {
  //const containerRef = useRef<HTMLDivElement>(null);

  const bg = "bg-gradientLight dark:bg-gradientDark";

  return (
    <div className={`flex items-center justify-center relative  h-screen ${bg}`}>
      <div className="flex flex-col gap-24 sm:gap-16 items-center">
        <div className="flex justify-center">
          <Image src="/assets/LogoDate.svg" width={275} height={161} alt="Data in latam Logo" className="sm:w-[339px] sm:h-[203px]" />
          <Image src="/assets/icons/ic-dil.png" width={100} height={100} alt="Data in latam Logo" className="sm:w-[100px] sm:h-[100px] self-end" />
        </div>
        <BoxRoot lng={lng} />
      </div>
    </div>
  );
}
