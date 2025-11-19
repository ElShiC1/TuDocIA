import { CardModal } from "@/components/atoms/CardModal"
import { Icon } from "@/components/atoms/Icon/Icons"
import { BarProgress } from "@/components/molecules/Stats/BarProgress"
import { Stats } from "@/components/molecules/Stats/Stats"
import { TitleAnswer } from "@/components/molecules/Trivia/Game/TitleAnswer"
import { TriviaGame } from "@/lib/store/Trivia/TriviaId"
import { TriviaView, TriviaViewEx } from "@/lib/types/ts/Quest"
import { formatDate } from "@/lib/utils/DateFormat"

export const Result = ({ resultTrivia }: { resultTrivia: TriviaViewEx }) => {

    const previusTrivia = TriviaGame((state) => state.previusTrivia)
    const reset = TriviaGame((state) => state.reset)

    return (
        <CardModal className="relative h-auto w-full bg-white border border-gray-300 shadow-2xl rounded-4xl p-10 flex flex-col gap-5 dark:bg-neutral-800 dark:border-gray-600">
            <TitleAnswer title={resultTrivia.title} align/>
            <div className="flex grow">
                <div className="flex-5 flex text-gray-700 flex-wrap gap-y-4 dark:text-white/95">
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
                    <Stats incorrect={resultTrivia.answer.incorrect} correct={resultTrivia.answer.correct} questions={resultTrivia.questions}/>
                </div>
            </div>
            <div className="flex gap-2 h-6">
                 <BarProgress correct={resultTrivia.answer.correct} questions={resultTrivia.questions} />
                <button
                    className="flex items-center h-full w-6 bg-blue-500 justify-center cursor-pointer z-1 rounded-full dark:bg-white dark:text-black text-white text-sm font-semibold"
                    onClick={() => previusTrivia()}
                    title="Visualizar respuestas"
                >
                    <Icon.View className=" h-full w-5" />
                </button>

                <button
                    className="flex items-center h-full w-6 bg-blue-500 justify-center cursor-pointer z-1 rounded-full  dark:bg-white dark:text-black text-white text-sm font-semibold"
                    onClick={() => reset()}
                    title="Intentar de nuevo"
                >
                    <Icon.Reload className="h-full w-5" />
                </button>
            </div>
        </CardModal>
    )
}