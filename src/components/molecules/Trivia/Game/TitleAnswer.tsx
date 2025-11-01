import { TriviaClient } from "@/lib/types/ts/Quest"

export const TitleAnswer = ({ triviaInfo }: { triviaInfo: TriviaClient }) => {
    return (
        <div className="flex justify-center">
            <span className="text-xl text-blue-500 font-semibold text-center">{triviaInfo.quest}</span>
        </div>
    )
}