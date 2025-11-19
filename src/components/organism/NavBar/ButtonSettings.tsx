import { User } from "@/lib/types/ts/User";
import { ModalButton } from "../../molecules/Modal/ModalButton";
import { Icon } from "@/components/atoms/Icon/Icons";
import { BtnChange } from "../../molecules/Form/BtnChange";
import { InputText } from "../../molecules/Form/InputText";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { userSettings } from "@/lib/actions/userSettings.actions";
import { useEffect } from "react";
import { ButtonSp } from "@/components/molecules/Form/ButtonSp";

export const ButtonSetting = ({ user }: { user: User }) => {


    const { theme, setTheme } = useTheme()
    const { register, watch, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            theme: theme === "light" ? false : true,   // ← Carga desde next-themes
            user: user.user,
            token: user.token
        }
    })

    const themeBool = watch("theme");

    const { onSubmitExport, onSubmitLogout, onSubmitConfig, isSubmmit } = userSettings()

    useEffect(() => {
        setTheme(!themeBool ? "light" : "dark");
    }, [themeBool]);


    return (
        <ModalButton id="setting" className="h-auto w-6.5" gap={3} icon={<Icon.Config className="dark:text-white cursor-pointer dark:hover:text-gray-200 transition-all text-gray-400 hover:text-gray-500" />} >
            <div className="flex gap-4">
                <div className="flex gap-5 flex-col order-2">
                    <BtnChange className="w-35" status={themeBool} name="theme" register={register} label="Tema" option={["Dark", "Light"]} />
                    <InputText name="user" label="Usuario" className="self-start w-35" register={register} errors={errors} />
                    <InputText name="token" label="Token" className="self-start w-35" register={register} errors={errors} />
                </div>

                <div className="flex flex-col gap-5 order-1">
                    <ButtonSp id="Guardar" isSubmitting={isSubmmit} className={`h-10 self-end ${isSubmmit ? "bg-gray-400 cursor-not-allowed " : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`} icon={<Icon.Save className="text-white h-5 w-5" />} onClick={handleSubmit(onSubmitConfig)} />
                    <ButtonSp id="Exportar" isSubmitting={isSubmmit} className={`h-10 self-end  ${isSubmmit ? "bg-gray-400 cursor-not-allowed " : "bg-green-500 hover:bg-green-600 cursor-pointer"}`} icon={<Icon.AddDB className="text-white h-5 w-5" />} onClick={handleSubmit(onSubmitExport)} />
                </div>
            </div>
            <ButtonSp id="Guardar" isSubmitting={isSubmmit} className={`h-10 text-sm w-full self-end ${isSubmmit ? "bg-gray-400 cursor-not-allowed " : "bg-gray-500 hover:bg-gray-600 cursor-pointer"}`} value="Cerrar Sesion" onClick={handleSubmit(onSubmitLogout)} />
        </ModalButton>
    )
}