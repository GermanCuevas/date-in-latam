import Image from "next/image";
import BoxRoot from "../components/BoxRoot";
import "./globals.css";
//className="flex items-center justify-center relative h-screen "
export default function Home() {
  const bg = "bg-gradientLight dark:bg-gradientDark";

  return (
    <div className={`flex items-center justify-center relative h-screen ${bg} `}>
      <div className="flex flex-col gap-24 sm:gap-16 items-center">
        <Image src="/assets/LogoDate.svg" width={275} height={161} alt="Data in latam Logo" className="sm:w-[339px] sm:h-[203px]" />
        <BoxRoot />
      </div>
    </div>
  );
}
//<main className="flex items-center justify-center relative h-screen "></main>
//</main>
//339
//203