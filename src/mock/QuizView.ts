import { TriviaView } from "@/lib/types/ts/Quest";

export const TriviaViewMock: TriviaView[] = {
        "title": "The Binding of Isaac: Rebirth",
        "questions": 2,
        "array": [
            {
                "quest": "¿Qué tipo de juego es The Binding of Isaac: Rebirth?",
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
            },
            {
                "quest": "¿Cuál es el nombre del personaje principal con el que comienzas en The Binding of Isaac: Rebirth?",
                "alternative": [
                    {
                        "answer": "Lazarus",
                        "correct": false
                    },
                    {
                        "answer": "Cain",
                        "correct": false
                    },
                    {
                        "answer": "Isaac",
                        "correct": true
                    },
                    {
                        "answer": "Maggy",
                        "correct": false
                    }
                ]
            }
        ]
    }
