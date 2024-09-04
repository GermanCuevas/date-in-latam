'use client';
import { useRouter } from 'next/navigation.js';
import Button from '../commons/Button'
import { useTranslation } from '@/app/i18n/client.js';

//Forma mas estricta de validar ruta con next y typescript:
//import { RoutePath } from 'react-router-dom';
//const redirectionHandle = (to: RoutePath) => {
//instalar: npm install --save-dev @types/react-router-dom
//border-myColorBlack-500 dark:border-vibrant-50

const BoxRoot = ({lng}) => {
  //console.log("lng ==>",lng);
  //console.log(useTranslation);
  
  const { t:traductor } = useTranslation(lng, "boxRoot")
  //console.log(traductor);
  
  const router = useRouter()
  const redirectionHandle = (to: string)=>{
    router.push(to)
  }

  //text-base
  return (
    <div className="flex flex-col p-5 shadow-xl rounded-md gap-y-8 bg-myColorTransparent-500">
      <Button type="button" text={traductor("register")} variant={"primary"} to="register" handleFunction={redirectionHandle} fontSize={"normal"} />
      <Button type="button" text={"¡Ya tengo cuenta!"} variant={"secondary"} to="login" handleFunction={redirectionHandle} fontSize={"normal"}/>
      <Button type="button" text={"Solo quiero hechar un vistazo  👀"} variant={"secondary"} to="welcome" handleFunction={redirectionHandle} fontSize={"normal"}/>
    </div>
  );
};

export default BoxRoot;
