import { Icon } from "@/components/atoms/Icon/Icons"

export const Suspense = ({ loading, children, data }: { children: React.ReactNode, loading: boolean, data?: [boolean, string, string?] }) => {

    if (loading) {
        return <div id="" className="flex h-full w-full items-center justify-center">
            <Icon.Spinner className="size-10" />
        </div>
    }

    if (data && data[0]) {
        return <div className="flex h-full w-full items-center justify-center">
            <div className="max-w-90 w-auto flex items-center gap-5 text-neutral-800 dark:text-white">
                <Icon.Bad className="h-15 w-15 shrink-0" />

                <div className="flex flex-col gap-1">
                    <span className="text-left font-bold dark:text-neutral-100 text-neutral-700 text-balance">
                        {data[1]}
                    </span>

                    {data[2] && (
                        <span className="text-left text-xs dark:text-neutral-300 text-neutral-500 font-semibold flex gap-1 truncate">
                            {data[2]}
                        </span>
                    )}
                </div>
            </div>
        </div>

    }

    return children
}