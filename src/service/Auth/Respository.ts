import { ApiResponse, Response } from "@/lib/types/ts/Response";
import { User } from "@/lib/types/ts/User";

export interface Repository {
    register: (data: { user: string, token: string }) => Promise<ApiResponse<{ id: number, token: string, user: string }>>
    update: (data: { user: string, token: string, theme: string }) => Promise<ApiResponse<{ id: number, token: string, user: string }>>
    validate: (token?: string) => Promise<ApiResponse<User>>
    logout: () => Promise<ApiResponse<{ session: boolean }>>
    exportDB: () => Promise<ApiResponse<{ database: string }>>
    deleteDB: () => Promise<ApiResponse<{ database: string }>>
    importDB: (file: File) => Promise<ApiResponse<{ database: string }>>
}