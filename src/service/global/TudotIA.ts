import { ApiService } from "../api/Axios";
import { AuthApp } from "../Auth/AuthApp";
import { TriviaApp } from "../Trivia/TriviaApp";


const apiservice = new ApiService()

export const TudotIA = {
    trivia: TriviaApp(apiservice),
    auth: AuthApp(apiservice),
}