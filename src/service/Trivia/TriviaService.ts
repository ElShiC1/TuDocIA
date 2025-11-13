import { GenerateQuest, Quest, TriviaClient, TriviaView } from "@/lib/types/ts/Quest";
import { TableTuDocAI } from "../db/Db";
import { UnixTime } from "@/lib/helper/UnixTime";
import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import { Cursor, MethodsPagination, TriviaCursor } from "./Repository";
import { filterSearch } from "@/lib/utils/filterSearch";
import Dexie, { Collection, InsertType } from "dexie";

export class TriviaService {

    private readonly limit = 4

    constructor(private readonly db: TableTuDocAI) { }

    async getCategory() {
        try {
            const data = await this.db.category.toArray()
            return data
        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al obtener las categorias.", { code: 'TRIVIA_getCategory', status: 404, context: { response: name } });
        }
    }

    async addCategory(name: string) {
        try {
            console.log(name)
            if (!isNaN(Number(name))) {
                const id = Number(name)
                const getId = await this.db.category.get(id as any)

                if (!getId) throw new ErrorGlobal('ERROR_SERVICE', "Error al abtener categoria.", { code: 'TRIVIA_addCategory', status: 404, context: { response: name } });

                return getId.id!
            }

            const existCategory = await this.db.category.where('name').equalsIgnoreCase(name).first()

            if (existCategory?.id) return existCategory.id;

            const category = await this.db.category.add({ name }) as number

            return category
        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al agregar categoria.", { code: 'TRIVIA_addCategory', status: 404, context: { response: name } });
        }
    }

    async addTrivia(data: Omit<GenerateQuest, 'category'> & { idcategory: number }) {
        try {
            const id = await this.db.trivia.add({
                title: data.quest,
                difficulty: data.difficulty,
                questions: data.questions,
                idcategory: data.idcategory,
                language: data.language,
                createAt: UnixTime(),
                answer: {
                    correct: 0,
                    incorrect: 0
                },
            }) as number
            return id
        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al agregar trivia.", { code: 'TRIVIA_ADD_FAILED', status: 404, context: { response: data } });
        }
    }

    async AddTriviaArray(data: TriviaClient[]) {
        try {
            await this.db.triviaQuest.bulkAdd(data.map((val) => ({
                idtrivia: val.idtrivia,
                userselect: undefined,
                iscorrect: undefined,
                alternative: val.alternative,
                quest: val.quest
            })))

            return true
        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al agregar trivia.", { code: 'TRIVIA_AddTriviaArray', status: 404, context: { response: data } });
        }
    }

    async updateTrivia(id: number, data: TriviaClient[]) {
        try {
            const trivia = await this.db.trivia.update(id as any, { answer: { correct: data.filter((data) => data.iscorrect).length, incorrect: data.filter((data) => !data.iscorrect).length } }) as number

            if (!trivia) throw new ErrorGlobal('ERROR_SERVICE', "Error al actualizar el trivia.", { code: 'Not_found', status: 404, context: { response: data } });

            const triviaGet = await this.db.trivia.get(id as any)

            if (!triviaGet) throw new ErrorGlobal('ERROR_SERVICE', "Error al encontrar el trivia.", { code: 'Not_found', status: 404, context: { response: data } });

            const {idcategory, ...more} = triviaGet
            
            const newTrivia = {
                ...more,
                category: await this.getCategoryId(idcategory)
            }

            await this.db.triviaQuest.bulkPut(data.map((val) => ({
                id: val.id,
                ...val
            })))

            return { data, triviaGet: newTrivia }
        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al actualizar trivia.", { code: 'TRIVIA_updateTrivia', status: 500, context: { response: data } });
        }
    }

    async getTriviId(id: number) {
        try {
            const getTrivia = await this.db.trivia.get(id as any)

            if (!getTrivia) throw new ErrorGlobal('ERROR_SERVICE', `Trivia con el id ${id} no encontrar.`, { code: 'Not_Found', status: 404, context: { response: id } });

            const { idcategory, ...data } = getTrivia

            const getNewTrivia = {
                ...data,
                category: await this.getCategoryId(idcategory)
            }


            const getTriviaArray = await this.db.triviaQuest.where('idtrivia').equals(id).toArray()

            return { getTrivia: getNewTrivia, getTriviaArray }
        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al agregar obtener el trivia.", { code: 'TRIVIA_getTriviId', status: 500, context: { response: id } });
        }
    }

    async getTriviaCursor(data: TriviaCursor) {
        try {
            const { filter, page } = data;
            let query: Collection<TriviaView, never, InsertType<TriviaView, never>>

            if (filter?.idCategory && !isNaN(Number(filter.idCategory))) {
                query = this.db.trivia.where('idcategory').equals(Number(filter.idCategory));
            } else if (filter?.difficulty) {
                console.log('paso aqui, difficulty')
                query = this.db.trivia.where('difficulty').equals(filter.difficulty);
            } else {
                query = this.db.trivia.orderBy('createAt');
            }
            console.log(filter, 'service')
            const queryData = query
                .filter(val => {
                    const conditions: boolean[] = []

                    // 🔍 Buscar por título o ID
                    if (filter?.search && filter.search.trim() !== "") {
                        const searchMatch =
                            !!(val.title && filterSearch(filter.search, val.title)) ||
                            !!(val.id && filter.search === String(val.id))
                        conditions.push(searchMatch)
                    }

                    // 🎯 Dificultad
                    if (filter?.difficulty) {
                        conditions.push(val.difficulty === filter.difficulty)
                    }

                    // 🏷️ Categoría
                    if (filter?.idCategory && !isNaN(Number(filter.idCategory))) {
                        conditions.push(val.idcategory === Number(filter.idCategory))
                    }

                    // 🚨 Si no hay ningún filtro activo → no filtramos nada (mostrar todo)
                    if (conditions.length === 0) return true

                    // ✅ Si hay filtros → mostrar si al menos uno coincide
                   return conditions.every(Boolean)
                })


            const resultOrder = !filter?.createAt ? queryData.reverse()  : queryData

            let totalItems: number

            if (true) {
                totalItems = await resultOrder.count()
            }


            // 2️⃣ Aplica filtro avanzado en memoria (solo sobre ese subconjunto)
            const results = await resultOrder
                .offset((page - 1) * this.limit)
                .limit(this.limit)
                .toArray();


            const mapResult = await Promise.all(
                results.map(async ({ idcategory, ...val }) => ({
                    ...val,
                    category: await this.getCategoryId(idcategory),
                }))
            )


            const totalPage = Math.ceil(totalItems / this.limit)


            return {
                data: mapResult,
                meta: {
                    limit: totalPage,
                    currentPage: page,
                    hasNextPage: page < totalPage,
                    hasPrevPage: page > 1,
                    items: results.length
                }
            } satisfies Cursor<typeof mapResult>;

        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al obtener el trivia.", { code: 'TRIVIA_getTriviId', status: 500, context: { response: 'category' } });
        }
    }


    async getCategoryId(id: number) {

        const result = await this.db.category.get(id as any)

        if (!result) throw new ErrorGlobal('ERROR_SERVICE', `Categoria con el id ${id} no encontrado.`, { code: 'Not_Found', status: 404, context: { response: id } });

        return result.name
    }
}