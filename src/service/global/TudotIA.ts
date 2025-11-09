import { ApiService } from "../api/Axios";
import { AuthApp } from "../Auth/AuthApp";
import { DatabaseIndex } from "../db/Db";
import { TriviaApp } from "../Trivia/TriviaApp";
import { TriviaService } from "../Trivia/TriviaService";
console.log("¿Estoy en navegador?", typeof window !== "undefined");

console.log('Inicializando base...')
const apiservice = new ApiService()
const database = DatabaseIndex.init()
const triviaService = new TriviaService(database);


export const TudotIA = {
    trivia: TriviaApp(apiservice, triviaService),
    auth: AuthApp(apiservice),
}