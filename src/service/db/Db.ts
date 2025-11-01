
import { TriviaClient, TriviaView } from "@/lib/types/ts/Quest";
import Dexie, { EntityTable } from "dexie";


export interface TableTuDocAI{
    trivia: EntityTable<TriviaView>
    triviaQuest: EntityTable<TriviaClient & {idtrivia: number}>
}

export const db = new Dexie('TuDocdAI') as Dexie & TableTuDocAI

db.version(0).stores({
    trivia: '++id, title, difficulty, category, questions, answer, completed',
    triviaQuest: '++id, idtrivia, quest, alternative, userselect, iscorrect'
})