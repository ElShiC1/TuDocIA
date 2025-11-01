"use client"
import { useProgress } from "@/lib/hook/useProgress"

export const LoadGameAnswer = ({current, total}:{current: number, total: number}) => {

    const progress = useProgress(current, total)

    return (
        <div
            className="absolute inset-[-3px] rounded-4xl z-[-1] "
            style={{
                "--angle": `${progress * 3.6}deg`,
                background:
                    "conic-gradient(#3b82f6 0deg, #3b82f6 var(--angle), white var(--angle), white 360deg)",
                mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "3px",
                transition: "var(--angle) 0.5s ease", // funciona porque es numérica
            } as React.CSSProperties}
        ></div>
    )
}