import { TriviaView } from "@/lib/types/ts/Quest";

export const TriviaViewMock: TriviaView[] = {
    "title": "The Binding of Isaac: Rebirth",
    "questions": 2,
    "array": Array.from({ length: 50 }, (_, i) => i + 1).map(i => ({
        "quest": `¿Qué tipo de juego es The Binding of Isaac: Rebirth ${i}?`,
        "alternative": [
            {
                "answer": "Juego de rol (RPG)",
                "correct": false
            },
            {
                "answer": "Plataformas",
                "correct": false
            },
            {
                "answer": "Roguelike (Acción-shooter con elementos de mazmorras)",
                "correct": true
            },
            {
                "answer": "Estrategia",
                "correct": false
            }
        ]
    }))



}
