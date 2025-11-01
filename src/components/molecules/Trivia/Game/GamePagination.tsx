import { TriviaClient } from "@/lib/types/ts/Quest"

export const GamePagination = ({ nextTrivia, currentQuestion, previusTrivia, triviaData, selectIdTrivia }: { currentQuestion: number, previusTrivia: () => void, triviaData: TriviaClient[], selectIdTrivia: (id: number) => void, nextTrivia: () => void }) => {

    const countSelect = triviaData.reduce((acc, t) => acc + (t.userselect !== undefined ? 1 : 0), 0);

    return (
        <div id="options-button" className="flex items-center h-7 relative justify-between ">
            {currentQuestion >= 1 && <button
                className="cursor-pointer z-1 min-w-7 h-7 rounded-full bg-blue-500 text-white items-center justify-center text-sm font-semibold block"
                onClick={previusTrivia}
            >
                &lt;
            </button>}
            <div
                id="scroll-x"
                className="scroll-x absolute left-0 right-0 flex h-full justify-start overflow-x-auto w-[calc(100%-6rem)] mx-auto"
            >
                <div className="flex justify-center gap-2 mx-auto">
                    {triviaData.map((value, index) => {


                        return (
                            <div
                                key={index}
                                className={`h-full min-w-7 cursor-pointer flex items-center justify-center rounded-full text-white text-sm font-semibold ${currentQuestion !== index ? value.userselect ? "bg-blue-300" : "bg-gray-400/60" : "bg-blue-500"} flex-shrink-0`}
                                onClick={() => selectIdTrivia(index)}
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
                    onClick={nextTrivia}
                >
                    &gt;
                </button>
            )}
        </div>
    )
}