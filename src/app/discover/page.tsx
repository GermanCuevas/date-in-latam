const Discover = () => {
  const dummyArray = [
    { name: "Juan", edad: 25 },
    { name: "María", edad: 30 },
    { name: "Pedro", edad: 22 },
    { name: "Lucía", edad: 28 },
    { name: "Carlos", edad: 35 },
    { name: "Sofía", edad: 24 },
    { name: "Andrés", edad: 27 },
    { name: "Elena", edad: 29 },
    { name: "Luis", edad: 31 },
    { name: "Ana", edad: 26 },
  ];
//items-center justify-center
//border-2 border-red-400 p-10 m-3
//w-[100px]
//text-myColorBlack-500 dark:text-myColorWhite-500
  return (
    <div className="flex relative sm:h-screen pt-20 pb-20 sm:pb-0 sm:pt-[65px]">
      <h1>Discover</h1>
      <div>
        {dummyArray.map((e) => {
          return (
            <div className="h-[80px] sm:mt-[100px] ">
              <p>{e.name}</p>
              <p>{e.edad}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
