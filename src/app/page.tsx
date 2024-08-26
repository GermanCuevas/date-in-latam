import Image from "next/image";
import BoxRoot from "../components/BoxRoot";
import "./globals.css";
//className="flex items-center justify-center relative h-screen "
export default function Home() {
  return (
    <div className="flex items-center justify-center relative h-screen bg-gradientLight dark:bg-gradientDark">
      <div className="flex flex-col gap-16">
        <Image src="/assets/LogoDate.svg" width={339} height={203} alt="Data in latam Logo" />
        <BoxRoot />
      </div>
    </div>
  );
}
//<main className="flex items-center justify-center relative h-screen "></main>
//</main>
