"use client"

import { TriviaView } from "@/lib/types/ts/Quest";
import { TriviaList } from "@/mock/TriviaList";
import { Cursor } from "@/service/Trivia/Repository";
import { create } from "zustand";

interface Trivia {
    trivia: TriviaView[],
    loading: boolean,
    cursor: Cursor,
    getList: (page: number) => void;
    getCursor: (page: number) => void;
}

export const Trivia = create<Trivia>((set, get) => ({
    trivia: [],
    loading: true,
    cursor: {
        limit: 0,
        currentPage: 1,
        next: false
    },
    getCursor: async (page = 1) => {
        set({ loading: true })
        const limitPage = Math.ceil(TriviaList.length / 4)
        // Limitar la página al máximo
        if (page > limitPage) return;

        set({
            loading: false,
            cursor: {
                limit: limitPage,
                currentPage: page,
                next: page < limitPage
            }
        });
    },
    getList: async (page = 1) => {
        set({ loading: true })
        const pageSize = 4
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const sliced = TriviaList.slice(start, end);

        set({
            loading: false,
            trivia: sliced,
        });
    }
}))