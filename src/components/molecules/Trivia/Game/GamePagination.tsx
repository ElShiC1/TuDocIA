"use client"
import { useScrollLeft } from "@/lib/hook/useScrollLeft";
import { TriviaClient } from "@/lib/types/ts/Quest"
import { useSearchParams } from "next/navigation";
import { use, useEffect } from "react";

export const GamePagination = ({ nextTrivia, currentQuestion, preview, previusTrivia, triviaData, selectIdTrivia }: { currentQuestion: number, previusTrivia: () => void, triviaData: TriviaClient[], selectIdTrivia: (id: number) => void, nextTrivia: () => void, preview: boolean }) => {

    const countSelect = triviaData.reduce((acc, t) => acc + (t.userselect !== undefined ? 1 : 0), 0);
    const searchParams = useSearchParams();
    const getButtonColor = (value: TriviaClient, index: number) => {

        if (currentQuestion === index) {
            return "bg-blue-500";
        }

        if (preview) {
            return value.iscorrect ? "bg-green-400" : "bg-red-400";
        }

        return triviaData[index].userselect !== undefined
            ? "bg-blue-400"
            : "bg-gray-400/60";
    };

    const dadReft = useScrollLeft("#ena-page", currentQuestion)

    useEffect(() => {
        selectIdTrivia(searchParams.get("id") ? parseInt(searchParams.get("id") as string) : 0);
    }, [searchParams])


    return (
        <div id="options-button" className="flex items-center h-7 relative justify-between ">
            {currentQuestion >= 1 && <button
                className="cursor-pointer z-1 min-w-7 h-7 rounded-full bg-blue-500 text-white items-center justify-center text-sm font-semibold block"
                onClick={() => {
                    previusTrivia()
                }}
            >
                &lt;
            </button>}
            <div
                ref={dadReft}
                id="scroll-x"
                className="scroll-x absolute left-0 right-0 flex h-full justify-start overflow-x-auto w-[calc(100%-6rem)] mx-auto"
            >
                <div className="flex justify-center gap-2 mx-auto" >
                    {triviaData.map((value, index) => {
                        return (
                            <div
                                id={currentQuestion === index ? "ena-page" : "des-page"}
                                key={index}
                                className={`h-full min-w-7 cursor-pointer flex items-center justify-center rounded-full text-white text-sm font-semibold ${getButtonColor(value, index)} flex-shrink-0`}
                                onClick={() => {
                                    selectIdTrivia(index)
                                }}
                            >
                                {index + 1}
                            </div>
                        )
                    })}
                </div>
            </div>
            {((currentQuestion < triviaData.length - 1) || countSelect === triviaData.length) && (
                <button
                    className="cursor-pointer z-1 min-w-7 h-7 ml-auto rounded-full bg-blue-500 text-white items-center justify-center text-sm font-semibold block"
                    onClick={() => {
                        nextTrivia()

                    }}
                >
                    &gt;
                </button>
            )}
        </div>
    )
}