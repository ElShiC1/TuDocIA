import { SuccessResponse } from "@/lib/types/ts/Response"

export const Response = <T>(value: { message: string, status: number, code: string }, data: T): SuccessResponse<T> => {
    return {
        success: true,
        message: value.message,
        timestamp: new Date().toISOString(),
        code: value.code,
        status: value.status,
        data: data
    }
}