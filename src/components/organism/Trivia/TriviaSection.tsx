"use client";

import { CardViewList } from "@/components/molecules/CardView/CardViewList"
import { Pagination } from "@/components/molecules/Pagination/Pagination"
import { Trivia } from "@/lib/store/Trivia/Trivia"
import { TriviaViewMock } from "@/mock/QuizView"
import { useEffect } from "react"



export const TriviaSection = ({ page }: { page: number }) => {

    const getList = Trivia((state) => state.getList)
    const getCursor = Trivia((state) => state.getCursor)
    const triviaList = Trivia((state) => state.trivia)
    const cursor = Trivia((state) => state.cursor)
    const loading = Trivia((state) => state.loading)

    useEffect(() => {
        getList(page)
        getCursor(page)
    }, [page])

    return (
        <section className="grow flex flex-col gap-5">
            <CardViewList data={triviaList} />
            <Pagination currentPage={page} limit={cursor.limit} />
        </section>
    )

}