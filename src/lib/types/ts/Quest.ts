export interface GenerateQuest {
    quest: string,
    questions: number,
    difficulty: 'easy' | 'medium' | 'hard',
    language: 'es' | 'en',
}


export interface QuestArray {
    quest: string,
    alternative: {
        answer: string,
        correct: boolean
    }[]
}

export interface Quest {
    title: string,
    questions: number,
    array: QuestArray[]
}


export interface TriviaView {
    id: number,
    title: string,
    category: string,
    difficulty: string,
    questions: number,
    answer: {
        correct: number,
        incorrect: number,
    }
}

export interface TriviaClient extends QuestArray{
    id?: number
    userselect?: number,
    iscorrect?: boolean
}