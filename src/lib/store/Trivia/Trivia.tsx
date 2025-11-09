"use client"

import { TriviaView, TriviaViewEx } from "@/lib/types/ts/Quest";
import { TriviaList } from "@/mock/TriviaList";
import { TudotIA } from "@/service/global/TudotIA";
import { Cursor, CursorMeta, MethodsPagination } from "@/service/Trivia/Repository";
import { create } from "zustand";

interface Trivia {
    trivia: TriviaViewEx[],
    loading: boolean,
    cursor?: CursorMeta,
    getList: (data: MethodsPagination<{ search?: string, idCategory?: number, createAt?: 'asc' | 'desc', difficulty?: string }>) => void;
    getCursor: (data: MethodsPagination<{ search?: string, idCategory?: number, createAt?: 'asc' | 'desc', difficulty?: string }>) => void;
}

export const Trivia = create<Trivia>((set, get) => ({
    trivia: [],
    loading: true,
    cursor: undefined,
    getCursor: async ({ page = 1, ...data }) => {
        const result = await TudotIA.trivia.getTriviaCursor({ page, ...data })
        console.log(result)
        if (result.success) {
            set({ cursor: result.data.meta, loading: false })
        }
    },
    getList: async ({ page = 1, ...data }) => {
        const result = await TudotIA.trivia.getTriviaCursor({ page, ...data })
        console.log(result)
        if (result.success) {
            set({ trivia: result.data.data, loading: false })
        }
    }
}))