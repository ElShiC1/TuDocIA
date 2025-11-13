"use client"

import { Button } from "@/components/molecules/Form/Button"
import { InputText } from "@/components/molecules/Form/InputText"
import { useFormZod } from "@/lib/hook/useFormZod";
import { message } from "@/lib/hook/useMessage";
import { TudotIA } from "@/service/global/TudotIA";
import Link from "next/link";
import { useRouter } from "next/navigation";
import z from "zod";


export const registerSchema = z.object({
    user: z
        .string()
        .min(3, "El usuario debe tener al menos 3 caracteres")
        .max(30, "El usuario no puede tener más de 30 caracteres")
        .regex(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y guiones bajos"),

    token: z
        .string()
        .min(6, "El token debe tener como minimo 6 caracteres")
});

export const Form = () => {

    const {
        register,
        handleSubmit,
        setSuccess,
        success,
        formState: { errors, isValid, isSubmitting }
    } = useFormZod(registerSchema)

    const router = useRouter()


    const submitForm = async (data: z.infer<typeof registerSchema>) => {
        const result = await TudotIA.auth.register(data);
        console.log(result)
        if (result?.success) {
            setSuccess(true)
            router.replace("/");
            router.refresh();
        }
    };



    return (
        <form method="post" className="flex flex-col gap-5 w-full h-full" onSubmit={handleSubmit(submitForm)}>
            <InputText name="user" label="Usuario" register={register} errors={errors} />
            <InputText name="token" label="Token" register={register} errors={errors} />
            <span className="text-xs text-center" style={{ viewTransitionName: "auth-text" }}>¿Tienes una cuenta TutDocAI?  <Link href={"/login"} className="text-blue-500 font-semibold">Iniciar Sesion</Link></span>
            <Button value={message([isSubmitting, "Creando cuenta"], [success, "Cuenta creada"], "Crear cuenta")} isSubmitting={isSubmitting} isSuccess={success} isValid={isValid} />
        </form>
    )
}