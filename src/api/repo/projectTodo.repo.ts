import { and, desc, eq, sql } from "drizzle-orm";
import { PersonalProjectTodoTable } from "../../db";
import type {
    IDeleteTodoByIdDtoIn,
    IGetTodoDetailsDtoOut,
    IUpdateTodoDtoIn,
    IUpdateTodoDtoOut,
} from "../../domain";
import type { ICreateNewTodoDoInQuery } from "../../domain/DTOs/todoDTO/todo.query.dto";

export class ProjectTodoRepo {
    constructor(
        // private readonly _todoModel: any,
        private readonly _db: any,
    ) {}

    // * TODOS
    async createNewTodoRepo(body: ICreateNewTodoDoInQuery) {
        const result = await this._db
            .insert(PersonalProjectTodoTable)
            .values({
                title: body.title,
                body: body.body,
                priority: body.priority,
                status: body.status,
                user_id: body.user_id,
            })
            .returning();

        return result[0] || null;
    }

    async getAllTodosWithFilter({
        todo_id,
        title,
        priority,
        status,
        user_id,
        limit,
        offset,
    }: {
        todo_id?: string;
        title?: string;
        priority?: any;
        status?: any;
        progress?: any;
        user_id: string;
        limit: number;
        offset: number;
    }) {
        return await this._db
            .select({
                todo_id: PersonalProjectTodoTable.todo_id,
                title: PersonalProjectTodoTable.title,
                priority: PersonalProjectTodoTable.priority,
                status: PersonalProjectTodoTable.status,
            })
            .from(PersonalProjectTodoTable)
            .where(
                and(
                    eq(PersonalProjectTodoTable.user_id, user_id),

                    todo_id ? eq(PersonalProjectTodoTable.todo_id, todo_id) : undefined,
                    title ? eq(PersonalProjectTodoTable.title, title) : undefined,
                    priority ? eq(PersonalProjectTodoTable.priority, priority) : undefined,
                    status ? eq(PersonalProjectTodoTable.status, status) : undefined,
                ),
            )
            .limit(limit)
            .offset(offset)
            .orderBy(desc(PersonalProjectTodoTable.createdAt));
    }

    async getTotalTodosCount({
        todo_id,
        title,
        priority,
        status,
        progress,
        user_id,
    }: {
        todo_id?: any;
        title?: any;
        priority?: any;
        status?: any;
        progress?: any;
        user_id: string;
    }) {
        const result = await this._db
            .select({ count: sql<number>`count(*)` })
            .from(PersonalProjectTodoTable)
            .where(
                and(
                    eq(PersonalProjectTodoTable.user_id, user_id),

                    todo_id ? eq(PersonalProjectTodoTable.todo_id, todo_id) : undefined,
                    title ? eq(PersonalProjectTodoTable.title, title) : undefined,
                    priority ? eq(PersonalProjectTodoTable.priority, priority) : undefined,
                    status ? eq(PersonalProjectTodoTable.status, status) : undefined,
                ),
            );

        return result[0]?.count || 0;
    }

    async deleteTodoByIdRepo(body: IDeleteTodoByIdDtoIn) {
        const { todo_id } = body;

        const result = await this._db
            .delete(PersonalProjectTodoTable)
            .where(eq(PersonalProjectTodoTable.todo_id, todo_id))
            .returning();

        return result[0] || null;
    }

    async updateTodoByIdRepo(updateTodoByIdBody: IUpdateTodoDtoIn): Promise<IUpdateTodoDtoOut> {
        const { todo_id, ...updateFields } = updateTodoByIdBody;

        const cleanFields = Object.fromEntries(
            Object.entries(updateFields).filter(([_, v]) => v !== undefined),
        );

        const result = await this._db
            .update(PersonalProjectTodoTable)
            .set({
                ...cleanFields,
                updatedAt: new Date(),
            })
            .where(eq(PersonalProjectTodoTable.todo_id, todo_id!))
            .returning();

        return result[0] || null;
    }

    async getTodoDetailsRepo(body: { todo_id: string }): Promise<IGetTodoDetailsDtoOut> {
        const { todo_id } = body;

        const result = await this._db
            .select({
                todo_id: PersonalProjectTodoTable.todo_id,
                title: PersonalProjectTodoTable.title,
                body: PersonalProjectTodoTable.body,
                priority: PersonalProjectTodoTable.priority,
                status: PersonalProjectTodoTable.status,
                createdAt: PersonalProjectTodoTable.createdAt,
                updatedAt: PersonalProjectTodoTable.updatedAt,
            })
            .from(PersonalProjectTodoTable)
            .where(eq(PersonalProjectTodoTable.todo_id, todo_id));

        return result[0] || null;
    }
}
