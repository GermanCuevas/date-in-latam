"use client";
import Button from "@/commons/Button";
import InputForm from "@/commons/InputForm";
import { useEffect, useRef, useState } from "react";
import validateEmptyFields from "@/utils/validateEmptyFields";
import validateFormatInputs from "@/utils/validateFormatInputs";
import FormFields from "@/types/FormFields";
import { dataInputsLogin } from "@/utils/dataToInputs";
import { InputField } from "@/utils/dataToInputs";
import { ErrorFieldsForm } from "@/types/ErrorFields";
import { useRouter } from "next/navigation";
import axios from "axios";
//firebase
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, linkWithCredential, signInWithPopup, signInWithCredential } from "firebase/auth";

//google
import { signIn, signOut, useSession } from "next-auth/react";

//Formulario de login
//Todos los campos del formulario deben declararse dentro del useState para poder ser usados en el formulario.
//Luego deben colocarse los respectivos valores dentro de un array para poder mapear los Inputs, que son commons.

const Form = () => {
  //const auth = getAuth();

  const provider = new GoogleAuthProvider();

  const router = useRouter();
  //const [alreadySent, setAlreadySent] = useState(false);
  const alreadySentRef = useRef(false);
  const [errorObject, setErrorObject] = useState<ErrorFieldsForm>({});

  //datos del google auth
  const { data: session, status } = useSession();

  console.log("Session:", session);
  console.log("Status:", status);

  const handleRegisterWithGoogle = async () => {
    console.log("handleRegisterWithGoogle");
    //funcion para redirigir al listado de mails de google
    signIn("google", { prompt: "select_account" });
  };

  // useEffect(() => {
  //   const verifySession = async () => {
  //     if (alreadySentRef.current) return;

  //     if (session && status === "authenticated") {
  //       try {
  //         const response = await axios.post("http://localhost:5000/date-in-latam/us-central1/addUserByGoogleAuth", session);

  //         if (response.status === 202) {
  //           try {
  //             const credential = GoogleAuthProvider.credential(session?.id_token);

  //             if (credential) {
  //               // 👇 primero logueamos en Firebase
  //               const userCredential = await signInWithCredential(auth, credential);
  //               console.log("Usuario autenticado en Firebase:", userCredential.user);

  //               // 👇 verificamos si ya está linkeado
  //               if (!userCredential.user.providerData.some((p) => p.providerId === "google.com")) {
  //                 await linkWithCredential(userCredential.user, credential);
  //                 console.log("✅ Google vinculado con tu cuenta manual");
  //                 router.push("/welcome");
  //               } else {
  //                 console.log("⚡ Ya estaba vinculado con Google");
  //               }

  //               alreadySentRef.current = true; // 👈 se setea después del éxito
  //             } else {
  //               console.warn("No se pudo crear credential desde id_token");
  //             }
  //           } catch (err: any) {
  //             if (err.code === "auth/provider-already-linked") {
  //               console.log("⚡ Ya estaba vinculado, ignoramos el error");
  //               alreadySentRef.current = true; // 👈 lo bloqueamos igual
  //             } else {
  //               console.error("Error al vincular:", err);
  //             }
  //           }
  //         }

  //         if (response.status === 201) {
  //           console.log("Ingreso exitoso 🎉");
  //           alreadySentRef.current = true; // 👈 también bloqueamos en éxito
  //           router.push("/welcome");
  //         }
  //       } catch (error: any) {
  //         console.error("Error al registrar usuario con Google:", error);
  //       }
  //     }
  //   };

  //   verifySession();
  //   console.log("session", session);
  // }, [session, status]);
  useEffect(() => {
    const verifySession = async () => {
      if (alreadySentRef.current) return;

      if (session && status === "authenticated") {
        // 🚨 Bloqueo inmediato, antes del axios
        alreadySentRef.current = true;

        try {
          const response = await axios.post("http://localhost:5000/date-in-latam/us-central1/addUserByGoogleAuth", session);

          if (response.status === 202) {
            try {
              const credential = GoogleAuthProvider.credential(session?.id_token);

              if (credential) {
                const userCredential = await signInWithCredential(auth, credential);
                console.log("Usuario autenticado en Firebase:", userCredential.user);

                if (!userCredential.user.providerData.some((p) => p.providerId === "google.com")) {
                  await linkWithCredential(userCredential.user, credential);
                  console.log("✅ Google vinculado con tu cuenta manual");
                  router.push("/welcome");
                } else {
                  console.log("⚡ Ya estaba vinculado con Google");
                }
              } else {
                console.warn("No se pudo crear credential desde id_token");
              }
            } catch (err: any) {
              if (err.code === "auth/provider-already-linked") {
                console.log("⚡ Ya estaba vinculado, ignoramos el error");
              } else {
                console.error("Error al vincular:", err);
              }
            }
          }

          if (response.status === 201) {
            console.log("Ingreso exitoso 🎉");
            router.push("/welcome");
          }
        } catch (error: any) {
          console.error("Error al registrar usuario con Google:", error);
          // 👉 liberás el flag si querés permitir reintentar
          alreadySentRef.current = false;
        }
      }
    };

    verifySession();
  }, [session, status]);

  const [dataForm, setDataForm] = useState<FormFields>({
    email: { value: "", red: false, label: "email" },
    password: { value: "", red: false, label: "password" },
  });

  const handleSubmit = async () => {
    const notSendSubmit = await validateEmptyFields({ setDataForm });
    if (notSendSubmit) {
      console.log("El formulario no se debe enviar, hay campos vacios");
      return;
    }
    await validateFormatInputs({ dataForm, setErrorObject });
    console.log("dataForm =>", dataForm);
    if (dataForm.email && dataForm.password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, dataForm.email?.value, dataForm.password?.value);
        console.log("Usuario autenticado:", userCredential.user);
        // ID token de Firebase (JWT)
        const token = await userCredential.user.getIdToken();
        console.log("token ====>", token);
        router.push("/welcome");
      } catch (error: any) {
        console.error("Error al iniciar sesión:", error.message);
        return null;
      }
    }
    //router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-28">
      <form className={`flex flex-col p-5 shadow-xl rounded-md gap-y-16 bg-myColorTransparent-500 font-semibold w-[290px] sm:w-[340px]`}>
        {dataInputsLogin.map(({ type, placeholder, name }: InputField) => {
          return <InputForm key={name} type={type} placeholder={placeholder} name={name} setDataForm={setDataForm} dataForm={dataForm} width={"w-72"} errorObject={errorObject} titleSelect={""} fontSizeInput={"normal"} colorFont="normal" />;
        })}
        <Button text={"Ingresar 💖"} variant={"primary"} type="submit" handleFunction={handleSubmit} to={""} fontSize={"normal"} />
      </form>
      <div>
        <Button img={{ src: "/assets/icons/g-logo.png", width: 40, height: 40 }} text={"Iniciar sesión con Google"} to={""} variant={"primary"} type="button" handleFunctionWithoutParam={handleRegisterWithGoogle} fontSize={"normal"} />
      </div>
    </div>
  );
};

export default Form;
