import { Login } from "@/components/organism/auth/login"
import { headers } from "next/headers";


export const AuthTemplate = async ({ children, token }: { children: React.ReactNode, token: string | null }) => {

    const referer = (await headers()).get('referer');
    const pathname = referer ? new URL(referer).pathname : '';
    console.log('pathname', pathname, 'no hay nada')
    if (pathname === '/register') {
        return children
    }

    if (!token) {
        return (
            <div id="auth-template" >
                <Login />
            </div>
        )
    }

    return children
}