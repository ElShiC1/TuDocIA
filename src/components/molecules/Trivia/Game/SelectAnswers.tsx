import { TriviaClient } from "@/lib/types/ts/Quest"

export const SelectAnswers = ({triviaInfo, selectedAnswer}:{triviaInfo: TriviaClient, selectedAnswer: (id: number) => void}) => {
    return (
        <div className="relative text-center flex flex-col gap-3.5">
            {triviaInfo.alternative.map((value, index) => (
                <div key={index} className="flex grow border-1 border-gray-300 rounded-xl overflow-hidden shadow-sm">
                    <input type="radio" name="quest" id={value.answer} className="hidden peer" checked={triviaInfo.userselect === index} onChange={() => selectedAnswer(index)} />
                    <label htmlFor={value.answer} className="peer-checked:bg-blue-500 grow cursor-pointer flex px-4 py-3 transition-colors hover:bg-gray-50 hover:text-black text-sm
             peer-checked:hover:bg-blue-600 peer-checked:hover:text-white duration-300 leading-5  peer-checked:text-white">
                        <span className="grow text-left">{value.answer}</span>
                    </label>
                </div>
            ))}
        </div>
    )
}