// import Image from "next/image";
// import BoxRoot from "@/components/BoxRoot";
import Landing from "@/components/Landing";

//mt-28
//Restamos 65px para que el contenido no se salga de la pantalla. Los 65px corresponden a la altura del header.
export default function Home() {
  return (
    <div className="flex gap-16 items-center h-screen justify-center">
      <Landing />
    </div>
  );
}
//h-screen
//sm:min-h-[calc(100vh-65px)]