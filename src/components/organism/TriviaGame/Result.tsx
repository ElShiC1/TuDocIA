import { CardModal } from "@/components/atoms/CardModal"
import { Icon } from "@/components/atoms/Icon/Icons"
import { BarProgress } from "@/components/molecules/Stats/BarProgress"
import { TitleAnswer } from "@/components/molecules/Trivia/Game/TitleAnswer"
import { TriviaGame } from "@/lib/store/Trivia/TriviaId"
import { TriviaView, TriviaViewEx } from "@/lib/types/ts/Quest"
import { formatDate } from "@/lib/utils/DateFormat"

export const Result = ({ resultTrivia }: { resultTrivia: TriviaViewEx }) => {

    const previusTrivia = TriviaGame((state) => state.previusTrivia)
    const reset = TriviaGame((state) => state.reset)

    return (
        <CardModal className="relative h-auto w-full bg-white border border-gray-300 shadow-2xl rounded-4xl p-10 flex flex-col gap-5">
            <TitleAnswer title={resultTrivia.title} align/>
            <div className="flex grow">
                <div className="flex-5 flex text-gray-700 flex-wrap gap-y-4">
                    <div className="flex flex-col basis-5/12">
                        <span className="text-sm text-gray-500">Creado</span>
                        <span>{formatDate(new Date(resultTrivia.createAt))}</span>
                    </div>
                    <div className="flex flex-col basis-5/12">
                        <span className="text-sm text-gray-500">Categoria</span>
                        <span>{resultTrivia.category}</span>
                    </div>
                    <div className="flex flex-col basis-5/12">
                        <span className="text-sm text-gray-500">Idioma</span>
                        <span>{resultTrivia.language}</span>
                    </div>
                    <div className="flex flex-col basis-5/12">
                        <span className="text-sm text-gray-500">Dificultad</span>
                        <span>{resultTrivia.difficulty}</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col answer gap-3 self-end">
                    {/* Stats Total */}
                    <div className=" py-1 px-2 h-full  flex items-center  gap-1 text-white bg-gray-500 rounded-xl  ">
                        <Icon.Neutral className="w-5 h-5" />
                        <span className="text-base">{resultTrivia.questions}</span>
                    </div>
                    {/* Stats Correct */}
                    <div className=" py-1 px-2  h-full flex items-center  gap-1 text-white bg-blue-500  rounded-xl  ">
                        <Icon.Check className="w-5 h-5" />
                        <span className="text-base">{resultTrivia.answer.correct}</span>
                    </div>
                    {/* Stats Incorrect */}
                    <div className=" py-1 px-2  h-full flex items-center  gap-1 text-white bg-red-500 rounded-xl  ">
                        <Icon.Incorrect className="w-5 h-5" />
                        <span className="text-base">{resultTrivia.answer.incorrect}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 h-6">
                 <BarProgress correct={resultTrivia.answer.correct} questions={resultTrivia.questions} />
                <button
                    className="flex items-center h-full w-6 bg-blue-500 justify-center cursor-pointer z-1 rounded-full  text-white text-sm font-semibold"
                    onClick={() => previusTrivia()}
                    title="Visualizar respuestas"
                >
                    <Icon.View className=" h-full w-5" />
                </button>

                <button
                    className="flex items-center h-full w-6 bg-blue-500 justify-center cursor-pointer z-1 rounded-full  text-white text-sm font-semibold"
                    onClick={() => reset()}
                    title="Intentar de nuevo"
                >
                    <Icon.Reload className="h-full w-5" />
                </button>
            </div>
        </CardModal>
    )
}