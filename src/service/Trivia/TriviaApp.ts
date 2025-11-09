import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import { ApiService, ErrorApi } from "../api/Axios";
import { Repository } from "./Repository";
import { GenerateQuest } from "@/lib/types/ts/Quest";
import { TriviaService } from "./TriviaService";
import { Response } from "@/server/helper/Response";

console.log("¿Estoy en navegador?", typeof window !== "undefined");

export const TriviaApp = (apiservice: ApiService, TriviaService: TriviaService): Repository => ({
    postTrivia: async (data: GenerateQuest, loading?: (number: number) => void) => {
        try {
            loading?.(20)
            const response = await apiservice.postTrivia(data)

            loading?.(40)
            const idcategory = await TriviaService.addCategory(data.category)

            loading?.(50)
            const id = await TriviaService.addTrivia({ ...data, idcategory })

            loading?.(80)
            await TriviaService.AddTriviaArray(response.data.array.map((val) => ({ ...val, idtrivia: id })))

            return Response({ message: `Trivia con el id ${id} creado.`, status: 200, code: "POST_TRIVIA" }, { id: id })
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorApi) {
                return error.response
            }

            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_TRIVIAAPP", "Error al agregar trivia.", { code: "TRIVIA_POST", status: 500 })
            return errorVal.toJSON()
        }
    },
    getTriviaId: async (id) => {
        try {
            const result = await TriviaService.getTriviId(id)
            return Response({ message: `Resultados de trivia ${id}.`, status: 200, code: "GET_TRIVIA_ID" }, result)
        } catch (error) {
            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_TRIVIAAPP", "Error al obtener trivia.", { code: "getTriviaId", status: 500, context: { id } })
            return errorVal.toJSON() as any
        }

    },
    updateTrivia: async (id, data) => {
        try {
            const resultAnswer = data.map((val, index) => ({
                ...val,
                iscorrect: val.userselect === data[index].alternative.findIndex(alt => alt.correct)
            }))

            const result = await TriviaService.updateTrivia(id, resultAnswer)
            return Response({ message: `Trivia actualizado con el ${id}.`, status: 200, code: "UPDATE_TRIVIA_ID" }, { getTrivia: result.triviaGet, getTriviaArray: result.data })
        } catch (error) {
            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_TRIVIAAPP", "Error al obtener trivia.", { code: "getTriviaId", status: 500, context: { id } })
            return errorVal.toJSON() as any
        }
    },
    getCategory: async () => {
        try {
            const result = await TriviaService.getCategory();
            return Response({ message: "Categoria obtenido", status: 200, code: "GET_CATEGORY" }, result)
        } catch (error) {
            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_TRIVIAAPP", "Error al obtener trivia.", { code: "getTriviaId", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    },
    getTriviaCursor: async (data) => {
        try {
            const response = await TriviaService.getTriviaCursor(data)
            return Response({ message: `Pagina ${data.page} obtenido.`, status: 200, code: "SUCCER_CURSOR" }, response)
        } catch (error) {
            const errorVal = error instanceof ErrorGlobal ? error : new ErrorGlobal("ERROR_TRIVIAAPP", "Error al obtener trivia.", { code: "getTriviaId", status: 500, context: {} })
            return errorVal.toJSON() as any
        }
    },
})