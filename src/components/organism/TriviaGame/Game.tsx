"use client"
import { CardModal } from "@/components/atoms/CardModal"
import { GamePagination } from "@/components/molecules/Trivia/Game/GamePagination"
import { LoadGameAnswer } from "@/components/molecules/Trivia/Game/LoadGameAnswer"
import { SelectAnswers } from "@/components/molecules/Trivia/Game/SelectAnswers"
import { TitleAnswer } from "@/components/molecules/Trivia/Game/TitleAnswer"
import { TriviaGame } from "@/lib/store/Trivia/TriviaId"

export const Game = ({ id }: { id?: number }) => {

    const triviaData = TriviaGame((state) => state.trivia)
    const currentQuestion = TriviaGame((state) => state.currentQuestion)
    const selectedAnswer = TriviaGame((state) => state.selectedAnswer)
    const selectIdTrivia = TriviaGame((state) => state.selectIdTrivia)
    const nextTrivia = TriviaGame((state) => state.nextTrivia)
    const previusTrivia = TriviaGame((state) => state.previusTrivia)
    const triviaInfo = triviaData[currentQuestion]


    return (
        <CardModal className="relative h-auto w-full bg-white border border-gray-300 shadow-2xl rounded-4xl p-10 flex flex-col gap-5">
            <LoadGameAnswer current={currentQuestion} total={triviaData.length} />
            <TitleAnswer triviaInfo={triviaInfo} />
            <SelectAnswers triviaInfo={triviaInfo} selectedAnswer={selectedAnswer} />
            <GamePagination selectIdTrivia={selectIdTrivia} currentQuestion={currentQuestion} triviaData={triviaData} nextTrivia={nextTrivia} previusTrivia={previusTrivia}/>
        </CardModal>
    )
}