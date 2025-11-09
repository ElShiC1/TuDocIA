import { TudotIA } from "@/service/global/TudotIA";
import { create } from "zustand";


interface Shared{
    category: {id?: number, name: string}[]
    getCategory: () => void
}

export const shared = create<Shared>((set, get) => ({
    category: [],
    getCategory: async () => {
        const result = await TudotIA.trivia.getCategory()

        if(result.success){
            set({category: result.data})
        }
    }
}))