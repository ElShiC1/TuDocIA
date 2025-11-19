import { Logo } from "./Icon/Logo"

export const Header = ({title}:{title: string}) => {
    return (
        <div id="title" className="gap-2 flex items-center h-10 w-full justify-between">
            <h1 className="text-xl font-semibold text-blue-600 dark:text-neutral-200">{title}</h1>
            <Logo className="w-auto h-full text-blue-500 dark:text-white"/>
        </div>
    )
}