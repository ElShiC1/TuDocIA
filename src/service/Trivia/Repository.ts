import { GenerateQuest, Quest, TriviaClient } from "@/lib/types/ts/Quest"
import { ApiResponse } from "@/lib/types/ts/Response"

export interface MethodsPagination<T extends Record<string, any>> {
    page: number,
    filter?: T
}

export interface Cursor {
    limit: number
    currentPage: number,
    next: boolean
}

export interface Repository {
    postTrivia: (data: GenerateQuest) => Promise<ApiResponse<Quest>>
    getCursor: () => void
    getTrivia: () => void
    getIdTrivia: () => void
}