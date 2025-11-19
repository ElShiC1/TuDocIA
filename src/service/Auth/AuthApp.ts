import { ErrorGlobal } from "@/lib/errors/ErrorGlobal"
import { ApiService } from "../api/Axios"
import { AuthService } from "./AuthService"
import { Repository } from "./Respository"
import { Response } from "@/server/helper/Response"
import { AxiosError } from "axios"
import { readJSONFile } from "@/lib/utils/readJSONFile"
import { file } from "zod"

export const AuthApp = (apiservice: ApiService, authService: AuthService): Repository => ({
    register: async (data) => {
        try {

            const response = await apiservice.register(data)

            const id = await authService.addToken(response.data.token)

            return Response({ message: `Usuario ${response.data.user} creado.`, status: 200, code: "SUCCES_REGISTER" }, { ...response.data, id: id })
        } catch (error) {

            if (error instanceof AxiosError) {
                if (error.response)
                    return error.response.data
            }

            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_AUTHAPP", "Error al REGISTRAR.", { code: "register", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    },
    validate: async (token) => {
        try {
            if (!token) throw new ErrorGlobal("ERROR_AUTHAPP", "No existe un token", { code: "validate", status: 500, context: { token } })
            const response = await apiservice.validate(token)
            return response
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response)
                    return error.response.data
            }
            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_AUTHAPP", "Error al validar", { code: "validate", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    },
    update: async (data) => {
        try {
            const response = await apiservice.register(data)

            const id = await authService.updateToken(response.data.token)
            return Response({ message: `Configuracion actualizada.`, status: 200, code: "SUCCES_UPDATE" }, { ...response.data, id: id })
        } catch (error) {

            if (error instanceof AxiosError) {
                if (error.response) {
    
                    return error.response.data
                }
            }

            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_AUTHAPP", "Error al ACTUALIZAR", { code: "update", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    },
    exportDB: async () => {
        try {
            await authService.exportDatabase();
            return Response({ message: `Base de datos exportado.`, status: 200, code: "SUCCES_UPDATE" }, { database: "TuDotIa" })
        } catch (error) {

            if (error instanceof AxiosError) {
                if (error.response) {
          
                    return error.response.data
                }
            }

            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_AUTHAPP", "Error al ACTUALIZAR", { code: "update", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    },
    deleteDB: async () => {
        try {
            await authService.deleteDatabase();
            return Response({ message: `Base de datos eliminado.`, status: 200, code: "DELETE_DB" }, { database: "TuDotIa" })
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {
         
                    return error.response.data
                }
            }
            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_AUTHAPP", "Error al ACTUALIZAR", { code: "update", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    },
    logout: async () => {
        try {
            await authService.exportDatabase()
            await authService.deleteDatabase()
            document.cookie = "x-token-api=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            return Response({ message: `Sesíon Cerrada.`, status: 200, code: "DELETE_DB" }, { database: "TuDotIa" })
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {

                    return error.response.data
                }
            }
            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_AUTHAPP", "Error al cerrar sesíon", { code: "logout", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    },
    importDB: async (file) => {
        try {
            const json = await readJSONFile(file)
            const service = await authService.importDatabase(json)
            const validate = await apiservice.validate(service.token, false)
            await apiservice.register(validate.data)

            return Response({ message: `Base de datos importado.`, status: 200, code: "IMPORT_DB" }, { database: "TuDotIa" })
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    return error.response.data
                }
            }
            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_AUTHAPP", "Error al ACTUALIZAR", { code: "update", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    }
})