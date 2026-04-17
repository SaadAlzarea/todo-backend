import { desc, eq } from "drizzle-orm";
import { PersonalProjectTable } from "../../db";
import type { ICreatePersonalProjectDtoInQuery, IDeletePersonalProjectDtoIn } from "../../domain";

export class PersonalProjectRepo {
    constructor(private readonly _db: any) {}

    // * PERSONAL PROJECT
    async createdProject(body: ICreatePersonalProjectDtoInQuery) {
        const result = await this._db
            .insert(PersonalProjectTable)
            .values({
                user_id: body.user_id,
                project_name: body.project_name,
                project_deadline: body.project_deadline,
            })
            .returning();

        return result[0] || null;
    }

    async deletePersonalProject(body: IDeletePersonalProjectDtoIn) {
        const result = await this._db
            .delete(PersonalProjectTable)
            .where(eq(PersonalProjectTable.project_id, body.project_id))
            .returning();

        return result[0] || null;
    }

    async getAllPersonalProject(body: { user_id: string }) {
        const result = await this._db
            .select({
                project_name: PersonalProjectTable.project_name,
                project_id: PersonalProjectTable.project_id,
                project_deadline: PersonalProjectTable.project_deadline,
                createdAt: PersonalProjectTable.createdAt,
            })
            .from(PersonalProjectTable)
            .where(eq(PersonalProjectTable.user_id, body.user_id))
            .orderBy(desc(PersonalProjectTable.createdAt));

        return result || null;
    }
}
