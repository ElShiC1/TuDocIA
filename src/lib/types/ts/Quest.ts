export interface GenerateQuest {
    quest: string,
    questions: number,
    difficulty: 'easy' | 'medium' | 'hard',
    language: 'es' | 'en',
    category: string
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
    id?: number,
    title: string,
    idcategory: number,
    difficulty: string,
    language: string,
    questions: number,
    createAt: number
    answer: {
        correct: number,
        incorrect: number,
    }
}


export type TriviaViewEx = Omit<TriviaView, 'idtrivia'> & { category: string }

export interface TriviaClient extends QuestArray{
    id?: number,
    idtrivia?: number
    userselect?: number,
    iscorrect?: boolean
}