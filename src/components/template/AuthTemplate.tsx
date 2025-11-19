import { ThemeProvider } from "next-themes"
import { Auth } from "../organism/global/Auth"
import { Toaster } from "sonner"
import { TudotIA } from "@/service/global/TudotIA"
import { cookies, headers } from "next/headers"

export const AuthTemplate = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies();
    const token = (await cookieStore).get('x-token-api'); // tu cookie de sesión
    const response = await TudotIA.auth.validate(token?.value)
    return (
        <ThemeProvider attribute={"class"} defaultTheme={response.success ? response.data.theme : 'system'} enableSystem>
            <div className={`w-screen h-screen bg-white dark:bg-neutral-900`}>
                <div className={`max-w-[30rem] max-h-full h-full p-5 flex flex-col mx-auto gap-5 `}>
                    <Auth response={response}>
                        {children}
                    </Auth>
                </div>
                <Toaster richColors />
            </div>
        </ThemeProvider>
    )
}