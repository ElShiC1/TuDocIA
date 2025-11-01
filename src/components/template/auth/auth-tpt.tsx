import { NavBar } from "@/components/organism/NavBar/NavBar";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const AuthTemplate = async ({ children }: { children: ReactNode }) => {

    const pathname = await (await headers()).get('x-pathname')!
    const tokenck = await (await cookies()).get('x-token-api')
    const publicRoutes = ['/login', '/register']
    const parsedToken = tokenck?.value ? JSON.parse(atob(tokenck.value)) : null;

    if (tokenck && publicRoutes.includes(pathname)) {
        console.log(pathname, 'se ejcuta siempre aqui')
        redirect('/')
    }

    if (!tokenck && publicRoutes.includes(pathname)) {
        return children
    }

    if (!tokenck) {
        return children
    }

    return (
        <>
            <NavBar user={parsedToken.user}/>
            {children}
        </>
    )
}