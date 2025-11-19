import z from "zod";
import { FileSchema } from "../types/validate/AuthVD";
import { TudotIA } from "@/service/global/TudotIA";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const authSubmit = () => {
    const [succes, setSuccess] = useState(false)
    const router = useRouter()


    const submitLogin = async (data: z.infer<typeof FileSchema>) => {
        const response = await TudotIA.auth.importDB(data.file[0])
        if (!response.success) {
            toast.error(response.message)
            return;
        }

        router.replace("/")
        router.refresh()
        setSuccess(true)
    }

    return { submitLogin, succes }
}