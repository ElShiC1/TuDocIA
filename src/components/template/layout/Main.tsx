import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { unstable_ViewTransition as ViewTransition } from 'react'

export const Main = ({
    children,
    transition,
    ...props
}: {
    children: ReactNode;
    transition?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {


    if (transition) {
        return (<ViewTransition name={transition}>
            <main {...props}>{children}</main>;
        </ViewTransition>)
    }

    return <main {...props}>{children}</main>;
};