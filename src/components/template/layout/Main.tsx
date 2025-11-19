import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export const Main = ({
    children,
    transition,
    ...props
}: {
    children: ReactNode;
    transition?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {


    if (transition) {
        return <main {...props}>{children}</main>

    }

    return <main {...props}>{children}</main>;
};