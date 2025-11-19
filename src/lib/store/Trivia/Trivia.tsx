import { TriviaViewEx } from "@/lib/types/ts/Quest";
import { TudotIA } from "@/service/global/TudotIA";
import { CursorMeta, TriviaCursor } from "@/service/Trivia/Repository";
import { create } from "zustand";

interface Trivia {
    trivia: TriviaViewEx[],
    filter?: TriviaCursor["filter"]
    loading: boolean,
    cursor?: CursorMeta,
    getList: (data: TriviaCursor) => void;
}

export const Trivia = create<Trivia>((set, get) => ({
    trivia: [],
    filter: {
        createAt: false
    },
    loading: true,
    cursor: undefined,
    getList: async ({ page = 1, ...data }) => {
        
        const result = await TudotIA.trivia.getTriviaCursor({ page, ...data })
        console.log(result, 'execute')
        if (result.success) {
            set({ trivia: result.data.data, loading: false, cursor: result.data.meta, filter: data.filter })
        }
    }
}))