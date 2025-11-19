"use client";

import { CardViewList } from "@/components/molecules/CardView/CardViewList"
import { Pagination } from "@/components/molecules/Pagination/Pagination"
import { Suspense } from "@/components/molecules/Suspense/Suspense";
import { Trivia } from "@/lib/store/Trivia/Trivia"
import { TriviaViewMock } from "@/mock/QuizView"
import { useEffect } from "react"



export const TriviaSection = ({ page }: { page: number }) => {

    const getList = Trivia((state) => state.getList)
    const triviaList = Trivia((state) => state.trivia)
    const cursor = Trivia((state) => state.cursor)
    const filter = Trivia((state) => state.filter)
    const loading = Trivia((state) => state.loading)

    useEffect(() => {
        getList({ page: page, filter: filter })
        console.log('trivia section')
    }, [page])

    return (
        <Suspense loading={loading} data={[triviaList.length === 0, "No hay resultados para mostrar", "Genera un trivia"]}>
            <section className="grow flex flex-col gap-5">
                <CardViewList data={triviaList} />
                <Pagination currentPage={cursor?.currentPage ?? page} limit={cursor?.limit ?? 0} />
            </section>
        </Suspense>

    )

}