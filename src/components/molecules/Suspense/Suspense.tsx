import { Icon } from "@/components/atoms/Icon/Icons"

export const Suspense = ({ loading, children }: { children: React.ReactNode, loading: boolean }) => {

    if (loading) {
        return <div id="" className="flex h-full w-full items-center justify-center">
            <Icon.Spinner className="size-10" />
        </div>
    }

    return children
}