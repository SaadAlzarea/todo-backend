import { and, eq, inArray } from "drizzle-orm";
import { AssignTodo, AssignTodoAttachment, db, UserTable } from "../../db";
import type {
    ICreateAssignTodoInGroupProjectDtoInQuery,
    IGetAllAssignTodoInGroupProjectListDtoIn,
    IGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn,
} from "../../domain/DTOs/assignTodoDTO";

export class AssignTodoRepo {
    constructor(private readonly _db = db) {}

    // async createAssignTodoInGroupProject(body: ICreateAssignTodoInGroupProjectDtoInQuery) {
    //     const result = await this._db
    //         .insert(AssignTodo)
    //         .values(
    //             body.assign_to.map((userId: any) => ({
    //                 group_id: body.group_id,
    //                 project_id: body.project_id,
    //                 assign_from: body.assign_from,
    //                 assign_to: userId,
    //                 title: body.title,
    //                 body: body.body,
    //                 priority: body.priority,
    //                 status: body.status,
    //                 deadline: body.deadline,
    //             })),
    //         )
    //         .returning();

    //     return result || null;
    // }

    async createAssignTodoInGroupProject(body: ICreateAssignTodoInGroupProjectDtoInQuery[]) {
        const result = await this._db.insert(AssignTodo).values(body).returning();

        return result;
    }

    async addAttachment(data: any) {
        const result = await this._db.insert(AssignTodoAttachment).values(data).returning();

        return result[0] || null;
    }

    async getAllAssignTodoInGroupProject(body: IGetAllAssignTodoInGroupProjectListDtoIn) {
        const result = await this._db
            .select({
                assign_todo_id: AssignTodo.assign_todo_id,
                project_id: AssignTodo.project_id,
                assign_from: AssignTodo.assign_from,
                assign_to: AssignTodo.assign_to,
                title: AssignTodo.title,
                priority: AssignTodo.priority,
                status: AssignTodo.status,
                isCompleted: AssignTodo.isCompleted,
                deadline: AssignTodo.deadline,
            })
            .from(AssignTodo)
            .where(
                and(
                    eq(AssignTodo.project_id, body.project_id),
                    eq(AssignTodo.group_id, body.group_id),
                ),
            );

        return result || null;
    }
    async getUsernameById(query: { assign_from: string; assign_to: string }[]) {
        const assignFromIds = query.map((u) => u.assign_from);
        const assignToIds = query.map((u) => u.assign_to);
        const allIds = [...assignFromIds, ...assignToIds];

        const result = await this._db
            .select({
                user_id: UserTable.user_id,
                username: UserTable.username,
            })
            .from(UserTable)
            .where(inArray(UserTable.user_id, allIds));

        return result;
    }

    async getAssignTodoDetails(body: IGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn) {
        const result = await this._db
            .select()
            .from(AssignTodo)
            .where(eq(AssignTodo.assign_todo_id, body.assign_todo_id));

        return result[0] || null;
    }

    async getAssignTodoAttachment(body: IGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn) {
        const result = await this._db
            .select()
            .from(AssignTodoAttachment)
            .where(eq(AssignTodoAttachment.assign_todo_id, body.assign_todo_id));

        return result || null;
    }
}
