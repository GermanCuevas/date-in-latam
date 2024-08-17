import Header from "../components/header"
import Image from "next/image"


export default function Home() {
  
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24" >
    <Image
            src="/assets/LogoDate.svg"
            width={339}
            height={203}
            alt="Data in latam Logo"
          />
    </main>
    </>
  );
}
