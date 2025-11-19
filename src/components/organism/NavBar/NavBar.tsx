"use client"
import { Icon } from "@/components/atoms/Icon/Icons"
import { User } from "@/lib/types/ts/User"
import { usePathname, useRouter } from "next/navigation"
import { ButtonSetting } from "./ButtonSettings"
import { Logo } from "@/components/atoms/Icon/Logo"

export const NavBar = ({ user }: { user: User }) => {

    const pathname = usePathname()
    const router = useRouter()

    return (
        <nav className="flex flex-col gap-5">
            <div id="user" className="flex justify-between">
                <span className="font-semibold text-gray-500 dark:text-white truncate">Hi, {user.user}</span>
                {pathname === "/" ? <ButtonSetting user={user} /> : <div onClick={() => router.push("/")}><Icon.Home className="w-6 h-auto text-gray-400 hover:text-gray-500 cursor-pointer transition-all" /></div>}
            </div>
        </nav>
    )
}