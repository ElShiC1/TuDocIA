import { NavBar } from "@/components/organism/NavBar/NavBar";
import { ApiResponse } from "@/lib/types/ts/Response";
import { User } from "@/lib/types/ts/User";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const Auth = async ({ children, response }: { children: ReactNode, response: ApiResponse<User> }) => {
    const header = (await headers()).get('x-pathname')

    if (!response.success && ["/login", "/register"].includes(header ?? "")) {
        return children
    }

    if (!response.success) {
        if ("/" === header) return children;
        redirect('/login')
    }

    if (["/login", "/register"].includes(header ?? "")) {
        redirect('/')
    }

    return (
        <>
            <NavBar user={response.data} />
            {children}
        </>
    )
}