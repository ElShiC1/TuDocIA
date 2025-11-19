import { ErrorGlobal } from "@/lib/errors/ErrorGlobal"
import { User } from "@/lib/types/ts/User"

export const TokenParsed = (token: string) => {
    try {
        const readToken = atob(token)
        const parsedToken = JSON.parse(readToken) as User
        return parsedToken
    } catch (error) {
        throw new ErrorGlobal('TokenParsed', 'Error al validar token', { code: 'ERROR_TOKEN', status: 500 })
    }
}