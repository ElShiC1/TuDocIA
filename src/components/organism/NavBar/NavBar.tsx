"use client"
import { usePathname } from "next/navigation"

export const NavBar = ({ user }: { user: string }) => {

    const pathname = usePathname()
    console.log(pathname)

    return (
        <nav className="flex flex-col gap-5">
            <div id="user" className="flex justify-between">
                <span className="font-semibold text-gray-500">Hi, {user}</span>
                <span>{pathname === "/" ? "x" : "<"}</span>
            </div>
        </nav>
    )
}