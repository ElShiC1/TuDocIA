import { ApiService } from "../api/Axios";
import { AuthApp } from "../Auth/AuthApp";
import { AuthService } from "../Auth/AuthService";
import { DatabaseIndex } from "../db/Db";
import { TriviaApp } from "../Trivia/TriviaApp";
import { TriviaService } from "../Trivia/TriviaService";

const apiservice = new ApiService()
DatabaseIndex.init()
const triviaService = new TriviaService(DatabaseIndex.db);
const authService = new AuthService(DatabaseIndex.db);

export const TudotIA = {
    trivia: TriviaApp(apiservice, triviaService),
    auth: AuthApp(apiservice, authService),
}