"use client"

import { TriviaGame } from "@/lib/store/Trivia/TriviaId"
import { Result } from "../organism/TriviaGame/Result";
import { Game } from "../organism/TriviaGame/Game";
import { useEffect } from "react";
import { Suspense } from "../molecules/Suspense/Suspense";

export const TriviaTemplate = ({ id }: { id: number }) => {

    const resultTrivia = TriviaGame((state) => state.resultTrivia)
    const preview = TriviaGame((state) => state.preview)
    const loading = TriviaGame((state) => state.loading)
    const initial = TriviaGame((state) => state.initial)
    const getTriviaId = TriviaGame((state) => state.getTriviaId)



    useEffect(() => {
        if (id) {
            getTriviaId(id)
        }

        return () => {
            console.log('componente desmontado')
            initial()
        }
    }, [id])

    const completedTrivia =
        !!resultTrivia &&
        ((resultTrivia.answer?.correct ?? 0) + (resultTrivia.answer?.incorrect ?? 0)) === resultTrivia.questions;


    return (
        <Suspense loading={loading} data={[!resultTrivia, `No se encontró la trivia con el ID ${id}`, 'Por favor, busca otra trivia disponible']}>
            {!loading && (!completedTrivia || preview) && <Game preview={preview} />}
            {!loading && completedTrivia && !preview && <Result resultTrivia={resultTrivia} />}
        </Suspense>
    )
}