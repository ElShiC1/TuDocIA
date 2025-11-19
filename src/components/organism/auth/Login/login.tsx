"use client"
import { InputJson } from "@/components/molecules/Auth/Login/InputJson"
import { Button } from "@/components/molecules/Form/Button"
import { loginSubmit } from "@/lib/actions/authSubmit.actions"
import { useFormZod } from "@/lib/hook/useFormZod"
import { message } from "@/lib/hook/useMessage"
import { FileSchema } from "@/lib/types/validate/AuthVD"
import Image from "next/image"
import Link from "next/link"

export const Login = () => {


    const {
        register,
        handleSubmit,
        setSuccess,
        watch,
        success,
        formState: { errors, isValid, isSubmitting }
    } = useFormZod(FileSchema)

    const fileMarc = watch("file")

    const {submitLogin} = loginSubmit()

  

    return (
        <div className="w-[24rem] max-w-md h-auto rounded-4xl bg-white border-1 border-gray-300 p-10 flex flex-col gap-6 shadow-2xl" style={{ viewTransitionName: 'div-auth' }}>
            <div id="title" className="gap-2 flex items-center h-10 w-full justify-between">
                <h1 className="text-xl font-semibold text-blue-600">Login</h1>
                <Image className="w-auto h-full" src="https://herrmans.eu/wp-content/uploads/2019/01/Hartje-Logo-500x500px.png" width={100} height={100} alt={""}></Image>
            </div>
            <form method="post" className="flex flex-col gap-5 w-full h-full" onSubmit={handleSubmit(submitLogin)}>
                <InputJson register={register} error={errors} fileMarc={fileMarc}/>
                <Button value={message([isSubmitting, "Iniciando"], [success, "Iniciaste Sesión"], "Iniciar Sesión")} isSubmitting={isSubmitting} isSuccess={success} isValid={isValid} />
                <span className="text-xs text-center" style={{ viewTransitionName: "auth-text" }}>¿Primera vez en TutDocAI?  <Link href={"/register"} className="text-blue-500 font-semibold">Regístrate</Link></span>
            </form>
        </div>
    )
}