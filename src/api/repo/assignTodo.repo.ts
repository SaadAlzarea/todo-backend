import { AssignTodo, AssignTodoAttachment, db } from "../../db";
import type { ICreateAssignTodoInGroupProjectDtoInQuery } from "../../domain/DTOs/assignTodoDTO";

export class AssignTodoRepo {
    constructor(private readonly _db = db) {}

    async createAssignTodoInGroupProject(body: ICreateAssignTodoInGroupProjectDtoInQuery) {
        const result = await this._db
            .insert(AssignTodo)
            .values({
                group_id: body.group_id,
                project_id: body.project_id,
                assign_from: body.assign_from,
                assign_to: body.assign_to,
                title: body.title,
                body: body.body,
                priority: body.priority,
                status: body.status,
                deadline: body.deadline,
            })
            .returning();

        return result[0] || null;
    }

    async addAttachment(data: any) {
        const result = await this._db.insert(AssignTodoAttachment).values(data).returning();

        return result[0] || null;
    }
}
