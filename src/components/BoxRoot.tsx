'use client';
import { useRouter } from 'next/navigation.js';
import Button from '../commons/Button'

//Forma mas estricta de validar ruta con next y typescript:
//import { RoutePath } from 'react-router-dom';
//const redirectionHandle = (to: RoutePath) => {
//instalar: npm install --save-dev @types/react-router-dom

//border-myColorBlack-500 dark:border-vibrant-50

const BoxRoot = () => {
  const router = useRouter()
  const redirectionHandle = (to: string)=>{
    router.push(to)
  }
  return (
    <div className="flex flex-col p-5 shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500">
      <Button type="button" text={"Regístrese para comenzar el viaje 😄"} variant={"primary"} to="register" handleFunction={redirectionHandle} />
      <Button type="button" text={"¡ Ya tengo cuenta !"} variant={"secondary"} to="login" handleFunction={redirectionHandle} />
      <Button type="button" text={"Solo quiero hechar un vistazo  👀"} variant={"secondary"} to="discover" handleFunction={redirectionHandle}/>
    </div>
  );
};

export default BoxRoot;
