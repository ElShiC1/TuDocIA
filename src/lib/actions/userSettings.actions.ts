"use client"
import { TudotIA } from "@/service/global/TudotIA";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";



export const userSettings = () => {

    const router = useRouter()
    const [loading, SetLoading] = useState(false)

    const onSubmitConfig = async (data: {
        theme: boolean;
        user: string;
        token: string;
    }) => {
        SetLoading(true)
        const response = await TudotIA.auth.update({ ...data, theme: data.theme ? 'light' : 'dark' })
        if (!response.success) {
            toast.error(response.message);
            SetLoading(false)
            return;
        }

        router.refresh()
        toast.success(response.message)
        SetLoading(false)
        return;
    };


    const onSubmitExport = async () => {
        SetLoading(true)
        const result = await TudotIA.auth.exportDB()

        if (!result.success) {
            toast.error(result.message)
            SetLoading(false)
            return;
        }

        toast.success(result.message)
        SetLoading(false)
        return;
    }

    const onSubmitDelete = async () => {
        SetLoading(true)
        const result = await TudotIA.auth.deleteDB()

        if (!result.success) {
            toast.error(result.message)
            SetLoading(false)
            return;
        }

        toast.success(result.message)
        window.location.reload()
        SetLoading(false)
        return;
    }


    const onSubmitLogout = async () => {
        SetLoading(true)
        const result = await TudotIA.auth.logout()

        if (!result.success) {
            toast.error(result.message)
            SetLoading(false)
            return;
        }

        toast.success(result.message)
        window.location.reload()
        SetLoading(false)
        return;
    }


    return { onSubmitDelete, onSubmitExport, onSubmitLogout, onSubmitConfig, isSubmmit: loading }
}