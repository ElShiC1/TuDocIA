import { TableTuDocAI } from "../db/Db";
import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import Dexie from "dexie";

export class AuthService {
    constructor(private readonly db: TableTuDocAI & Dexie) { }

    async addToken(token: string) {
        try {
            const id = await this.db.user.add({ token: token })
            return id
        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al agregar token.", { code: 'AUTH_ADDTOKEN', status: 404, context: { response: name } });
        }
    }

    async updateToken(token: string) {
        try {
            await this.db.user.update(1, { token: token })
            return true
        } catch (error) {
            throw new ErrorGlobal('ERROR_SERVICE', "Error al actualizar token.", { code: 'AUTH_UPDATETOKEN', status: 404, context: { response: name } });
        }
    }

    async exportDatabase() {
        try {
            const exportData: Record<string, unknown[]> = {};

            if (this.db.tables.length === 0) throw new ErrorGlobal('exportDatabase', "No existe ninguna tabla para exportar", { code: 'AUTH_SERVICE', status: 404, context: { response: {} } })

            for (const table of this.db.tables) {
                const rows = await table.toArray();
                exportData[table.name] = rows;
            }

            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: "application/json",
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            const fileName = `${this.db.name}-backup-${new Date().toISOString().slice(0, 10)}.json`;
            a.download = fileName;

            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            throw new ErrorGlobal('exportDatabase', "Error al exportar.", { code: 'AUTH_¿SERVICE', status: 404, context: { response: name } });
        }

    }

    async deleteDatabase() {
        try {
            await this.db.delete()
            return;
        } catch (error) {
            throw new ErrorGlobal('deleteDatabase', "Error al eliminar.", { code: 'AUTH_¿SERVICE', status: 404, context: { response: name } });
        }
    }

    async importDatabase(jsonData: Record<string, unknown[]>) {
        try {
            if (this.db.tables.length === 0) {
                throw new ErrorGlobal('importDatabase', "Ninguna tabla existente.", {
                    code: 'AUTH_SERVICE',
                    status: 404,
                    context: { response: name }
                });
            }


            let userIdData: { id: number; token: string } | undefined;

            await this.db.transaction('rw', this.db.tables, async () => {
                for (const table of this.db.tables) {

                    const data = jsonData[table.name];
                    console.log(data)
                    if (!Array.isArray(data)) {
                        throw new ErrorGlobal('importDatabase', "Archivo inválido.", {
                            code: 'AUTH_SERVICE',
                            status: 400,
                            context: { table: table.name }
                        });
                    }

                    await table.clear();
                    await table.bulkAdd(data);

                    if (table.name === "user") {
                        userIdData = await table.get(1);
                    }
                }
            });

            if (!userIdData) {
                throw new ErrorGlobal('importDatabase', "Usuario inexistente.", {
                    code: 'AUTH_SERVICE',
                    status: 404,
                    context: { response: name }
                });
            }

            return userIdData;

        } catch (error) {
            console.error("Error de importación:", error);

            throw new ErrorGlobal('importDatabase', "Error al importar.", {
                code: 'AUTH_SERVICE',
                status: 500,
                context: { raw: error }
            });
        }

    }
}