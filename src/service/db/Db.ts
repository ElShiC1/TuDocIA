
import { TriviaClient, TriviaView } from "@/lib/types/ts/Quest";
import Dexie, { EntityTable } from "dexie";


export interface TableTuDocAI {
    trivia: EntityTable<TriviaView>
    triviaQuest: EntityTable<TriviaClient>
    category: EntityTable<{id?: number, name: string}>
}

export class DatabaseIndex {
  static init(): Dexie & TableTuDocAI {
    const db = new Dexie('TuDocdAI') as Dexie & TableTuDocAI;
    db.version(1).stores({
      trivia: '++id, title, difficulty, idcategory, questions, answer, createAt',
      triviaQuest: '++id, idtrivia, quest, alternative, userselect, iscorrect',
      category: '++id, name'
    });
    return db;
  }
}



