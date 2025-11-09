"use client"
import { CardModal } from "@/components/atoms/CardModal"
import { GamePagination } from "@/components/molecules/Trivia/Game/GamePagination"
import { LoadGameAnswer } from "@/components/molecules/Trivia/Game/LoadGameAnswer"
import { SelectAnswers } from "@/components/molecules/Trivia/Game/SelectAnswers"
import { TitleAnswer } from "@/components/molecules/Trivia/Game/TitleAnswer"
import { TriviaGame } from "@/lib/store/Trivia/TriviaId"
import { useEffect } from "react"

export const Game = ({ preview }: { preview: boolean }) => {

    const triviaData = TriviaGame((state) => state.trivia)
    const currentQuestion = TriviaGame((state) => state.currentQuestion)
    const selectedAnswer = TriviaGame((state) => state.selectedAnswer)
    const selectIdTrivia = TriviaGame((state) => state.selectIdTrivia)
    const nextTrivia = TriviaGame((state) => state.nextTrivia)
    const previusTrivia = TriviaGame((state) => state.previusTrivia)
    const triviaInfo = triviaData[currentQuestion]

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    return (
        <CardModal className="relative h-auto w-full bg-white border border-gray-300 shadow-2xl rounded-4xl p-10 flex flex-col gap-5">
            <LoadGameAnswer current={currentQuestion} total={triviaData.length} />
            <TitleAnswer title={triviaInfo.quest} />
            <SelectAnswers preview={preview} triviaInfo={triviaInfo} selectedAnswer={selectedAnswer} />
            <GamePagination preview={preview} selectIdTrivia={selectIdTrivia} currentQuestion={currentQuestion} triviaData={triviaData} nextTrivia={nextTrivia} previusTrivia={previusTrivia} />
        </CardModal>
    )
}