import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import { ApiService, ErrorApi } from "../api/Axios";
import { Repository } from "./Repository";



export const TriviaApp = (apiservice: ApiService): Repository => ({
    postTrivia: async (data) => {
        try {
            const response = await apiservice.postTrivia(data)
            console.log("response trivia app", response)
            return response
        } catch (error) {
            if(error instanceof ErrorApi){
                return error.response 
            }
        }
    },
    getCursor: () => { },
    getTrivia: () => { },
    getIdTrivia: () => { }
})