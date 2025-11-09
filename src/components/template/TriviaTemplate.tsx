"use client"

import { TriviaGame } from "@/lib/store/Trivia/TriviaId"
import { Result } from "../organism/TriviaGame/Result";
import { Game } from "../organism/TriviaGame/Game";
import { useEffect } from "react";

export const TriviaTemplate = ({ id }: { id: number }) => {

    const resultTrivia = TriviaGame((state) => state.resultTrivia)
    const preview = TriviaGame((state) => state.preview)
    const loading = TriviaGame((state) => state.loading)
    const getTriviaId = TriviaGame((state) => state.getTriviaId)
    

    console.log(resultTrivia, 'que pashooo')

    useEffect(() => {
        if (id) {
            getTriviaId(id)
        }
    }, [id, getTriviaId])

    if (loading) {
        return <p className="text-center text-gray-500">Cargando trivia...</p>
    }


    const completedTrivia =
        !!resultTrivia &&
        ((resultTrivia.answer?.correct ?? 0) + (resultTrivia.answer?.incorrect ?? 0)) === resultTrivia.questions;




    return (
        <>
            {(!completedTrivia || preview) && <Game preview={preview} />}
            {completedTrivia && !preview && <Result resultTrivia={resultTrivia} />}
        </>
    )
}