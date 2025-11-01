import { TriviaView } from "@/lib/types/ts/Quest";

export const TriviaList: TriviaView[] = Array.from({ length: 50 }).map((_val, index) => {
    return { id: index, title: `Cultura General ${index}`, category: "Educación", difficulty: "Fácil", questions: 10, answer: { correct: 7, incorrect: 3 } }
})