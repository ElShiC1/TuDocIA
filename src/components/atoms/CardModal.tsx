import { DetailedHTMLProps, HTMLAttributes } from "react"

export const CardModal = ({ children, ...props }: { children: React.ReactNode } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
}