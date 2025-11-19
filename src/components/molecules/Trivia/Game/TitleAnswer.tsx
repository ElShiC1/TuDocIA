import { TriviaClient } from "@/lib/types/ts/Quest"

export const TitleAnswer = ({ title, align }: { title: string, align?: boolean }) => {
    return (
        <div className={`flex ${!align ? "justify-center" : ""} `}>
            <span className="text-xl text-blue-500 font-semibold text-center dark:text-white">{title}</span>
        </div>
    )
}