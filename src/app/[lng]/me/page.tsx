import Image from "next/image";

const fakeData = {
  title: "La noche es mas oscura antes del amanecer",
  aboutMe: `Hi! I'm Germán, from Argentina, a country in the south of South America. I'm passionate about drawing, art, and rock/metal music, but above all, video games; I'm currently developing my own game.

About me: 
* Financially stable.
* I work and study hard.
* I go to the gym.
* I don't have much free time, but if someone interests me, I'll make time to talk!
* My English isn't perfect, but I want to improve.

Made in Argentina 😎`,
  aboutYou: `Looking for a partner who:

* Has a positive attitude
* Values patience as essential
* Is patient in communication
* Doesn't depend on a man to be happy`,
  iHaveChildren: "Sí ( vivo con )",
  education: "Universitario",
  willingToRelocate: "No",
  religion: "Catolica",
  wantChildren: "No",
  smoker: "No mostrar",
  drinker: "Socialmente",
};

const Me = () => {
  //mt-[30px] sm:mt-[65px]
  //pt-[30px] md:pt-[65px]
  return (
    <div className="mb-[130px] flex flex-col gap-5 relative pt-[30px] md:pt-[65px]">
      <section className="flex justify-center ">
        <div className="rounded-full border-8 border-myColorBlack-500 w-[250px] h-[250px] overflow-hidden ">
          <Image src={"/assets/catProfileDefault.jpeg"} width={250} height={250} alt="Profile avatar default" />
        </div>
      </section>
      <section className="flex flex-col gap-5 w-[90%] self-center ">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-4xl sm:text-6xl text-myColorBlack-500 dark:text-myColorWhite-500 text-center">Juanito Arcoiris</h1>
          <h2 className="text-2xl text-myColorBlack-500 dark:text-myColorWhite-500 text-center italic">{fakeData.title}</h2>
        </div>
        <div className="flex flex-col mt-[50px] text-myColorBlack-500 dark:text-myColorWhite-500">
          <div className="w-[90%] flex flex-col gap-10">
            <div className="flex flex-col gap-y-3">
              <h3>Acerca de mi:</h3>
              <div className="shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500 p-5">
                <p className="whitespace-pre-line">{fakeData.aboutMe}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3>Lo que espero de ti:</h3>
              <div className="shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500 p-5">
                <p className="whitespace-pre-line">{fakeData.aboutYou}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center flex-col w-[90%] self-center gap-2">
        <div>
          <span className="text-myColorBlack-500 dark:text-myColorWhite-500 text-sm sm:text-base">Algunas de mis fotos :</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-between w-[80%] self-center">
          <div className=" ">
            <div className="relative  w-[120px] h-[120px]">
              {/* <input type="file" accept="image/*" onChange={handleFileUpload} multiple className="absolute  z-10 w-full h-full opacity-0 cursor-pointer" disabled={arrayUrlImages.length >= 5} /> */}
              {/* <div className="border w-full h-full absolute rounded border-myColorBlack-500 dark:border-myColorWhite-500 border-dashed flex items-center justify-center">
                <Image src={"/assets/uploadImage.png"} width={100} height={100} alt="Icon Upload Photo" />
              </div> */}
            </div>
            <span className="text-myColorBlack-500 dark:text-myColorWhite-500">1/5</span>
          </div>
          {/* {arrayUrlImages.map((image, idx, array) => {
            return <ImageProfile key={`${idx}-${image}`} image={image} idx={idx} handleDeleteByIdx={handleDeleteByIdx} array={array} />;
          })} */}
        </div>
      </section>
    </div>
  );
};

export default Me;
