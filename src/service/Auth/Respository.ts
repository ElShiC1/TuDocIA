import { Response } from "@/lib/types/ts/Response";




export interface Repository {
    register: ({ username }: { username: string, token: string }) => Promise<Response<{ username: string, token: string }>>
}