
import { TriviaClient, TriviaView } from "@/lib/types/ts/Quest";
import Dexie, { EntityTable } from "dexie";


export interface TableTuDocAI {
  trivia: EntityTable<TriviaView>
  triviaQuest: EntityTable<TriviaClient>
  category: EntityTable<{ id?: number, name: string }>
  user: EntityTable<{ id: number, token: string }, "id">
}

export class DatabaseIndex {
  static db = new Dexie('TuDocAI') as Dexie & TableTuDocAI;

  static init() {
    this.db.version(1).stores({
      trivia: '++id, title, difficulty, idcategory, questions, answer, createAt',
      triviaQuest: '++id, idtrivia, quest, alternative, userselect, iscorrect',
      category: '++id, name',
      user: '++id, token'
    });
  }

}



