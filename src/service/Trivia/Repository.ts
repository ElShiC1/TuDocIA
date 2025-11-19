import { GenerateQuest, TriviaClient, TriviaViewEx } from "@/lib/types/ts/Quest"
import { ApiResponse } from "@/lib/types/ts/Response"

export interface MethodsPagination<T extends Record<string, any>> {
    page: number,
    filter?: T
}

export interface Cursor<T> {
    data: T
    meta: {
        limit: number,
        items: number,
        currentPage: number,
        hasNextPage: boolean,
        hasPrevPage: boolean,
    }
}

export type CursorMeta = Cursor<any>["meta"];


export type TriviaCursor = MethodsPagination<{ search?: string, idCategory?: string, createAt?: boolean, difficulty?: string }>


export interface Repository {
    postTrivia: (data: GenerateQuest, loading?: (number: number) => void) => Promise<ApiResponse<{ id: number }>>
    updateTrivia: (id: number, data: TriviaClient[]) => Promise<ApiResponse<{
        getTrivia: TriviaViewEx;
        getTriviaArray: TriviaClient[]
    }>>
    getTriviaId: (id: number) => Promise<ApiResponse<{
        getTrivia: TriviaViewEx;
        getTriviaArray: TriviaClient[]
    }>>
    getTriviaCursor: (data: TriviaCursor) => Promise<ApiResponse<{
        data: TriviaViewEx[];
        meta: {
            limit: number;
            currentPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
            items: number;
        };
    }>>,
    getCategory: () => Promise<ApiResponse<{
        id?: number;
        name: string;
    }[]>>
}