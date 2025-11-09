import { useEffect, useRef } from "react";

export const useScrollLeft = (id: string, currentQuestion: number) => {

    const dadReft = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!dadReft.current) return;

        const activeElement = dadReft.current.querySelector(id) as HTMLElement;
        if (!activeElement) return;

        const container = dadReft.current;

        const scrollPosition =
            activeElement.offsetLeft -
            (container.clientWidth / 2) +
            (activeElement.clientWidth / 2);

        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        });
    }, [currentQuestion]);

    return dadReft

}