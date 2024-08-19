'use client';
import { useRouter } from 'next/navigation.js';
import Button from '../commons/Button.jsx'

const BoxRoot = () => {
  const router = useRouter()
  const redirectionHandle = (to)=>{
    router.push(to)
  }
  return (
    <div className="flex flex-col p-5 border border-myColorBlack-500 rounded-md gap-y-16">
      <Button text={"Regístrese para comenzar el viaje 😄"} bg={"bg-vibrant-500"} to="register" redirectionHandle={redirectionHandle} />
      <Button text={"¡ Ya tengo cuenta !"} bg={"bg-transparent"} to="login" redirectionHandle={redirectionHandle} />
      <Button text={"Solo quiero hechar un vistazo  👀"} bg={"bg-transparent"} to="discover" redirectionHandle={redirectionHandle}/>
    </div>
  );
};

export default BoxRoot;
