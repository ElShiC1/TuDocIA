"use client"
import { InputJson } from "@/components/molecules/Auth/Login/InputJson"
import { Button } from "@/components/molecules/Form/Button"
import { authSubmit } from "@/lib/actions/authSubmit.actions"
import { useFormZod } from "@/lib/hook/useFormZod"
import { message } from "@/lib/hook/useMessage"
import { FileSchema } from "@/lib/types/validate/AuthVD"
import Image from "next/image"
import Link from "next/link"

export const Form = () => {


    const {
        register,
        handleSubmit,
        setSuccess,
        watch,
        success,
        formState: { errors, isValid, isSubmitting }
    } = useFormZod(FileSchema)

    const fileMarc = watch("file")

    const { submitLogin } = authSubmit()

    return (
        <form method="post" className="flex flex-col gap-5 w-full h-full" onSubmit={handleSubmit(submitLogin)}>
            <InputJson register={register} error={errors} fileMarc={fileMarc} />
            <Button value={message([isSubmitting, "Iniciando"], [success, "Iniciaste Sesión"], "Iniciar Sesión")} isSubmitting={isSubmitting} isSuccess={success} isValid={isValid} />
            <span className="text-xs text-center" style={{ viewTransitionName: "auth-text" }}>¿Primera vez en TutDocAI?  <Link href={"/register"} className="text-blue-500 font-semibold">Regístrate</Link></span>
        </form>
    )
}