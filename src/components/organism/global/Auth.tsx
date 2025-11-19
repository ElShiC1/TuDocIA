import { NavBar } from "@/components/organism/NavBar/NavBar";
import { ApiResponse } from "@/lib/types/ts/Response";
import { User } from "@/lib/types/ts/User";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const Auth = async ({ children, response }: { children: ReactNode, response: ApiResponse<User> }) => {

    const pathname = await (await headers()).get('x-pathname')!
    const publicRoutes = ['/login', '/register']

    if (publicRoutes.includes(pathname)) {
        redirect('/')
    }

    if (!response.success) {
        return children
    }

    return (
        <>
            <NavBar user={response.data} />
            {children}
        </>
    )
}