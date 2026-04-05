import { and, desc, eq, sql } from "drizzle-orm";
import { TodoTable } from "../../db";
import type { IDeleteTodoByIdDtoIn, IUpdateTodoDtoIn } from "../../domain";
import type { ICreateNewTodoDoInQuery } from "../../domain/DTOs/todoDTO/todo.query.dto";

export class TodoRepo {
    constructor(
        // private readonly _todoModel: any,
        private readonly _db: any,
    ) {}

    async createNewTodoRepo(body: ICreateNewTodoDoInQuery) {
        const result = await this._db
            .insert(TodoTable)
            .values({
                title: body.title,
                body: body.body,
                progress: body.progress,
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
        progress,
        user_id,
        limit,
        offset,
    }: {
        todo_id?: string;
        title?: string;
        priority?: any;
        status?: any;
        progress?: any;
        user_id: string; // 👈 إجباري
        limit: number;
        offset: number;
    }) {
        return await this._db
            .select({
                todo_id: TodoTable.todo_id,
                title: TodoTable.title,
                priority: TodoTable.priority,
                status: TodoTable.status,
                progress: TodoTable.progress,
            })
            .from(TodoTable)
            .where(
                and(
                    eq(TodoTable.user_id, user_id),

                    todo_id ? eq(TodoTable.todo_id, todo_id) : undefined,
                    title ? eq(TodoTable.title, title) : undefined,
                    priority ? eq(TodoTable.priority, priority) : undefined,
                    status ? eq(TodoTable.status, status) : undefined,
                    progress ? eq(TodoTable.progress, progress) : undefined,
                ),
            )
            .limit(limit)
            .offset(offset)
            .orderBy(desc(TodoTable.createdAt));
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
            .from(TodoTable)
            .where(
                and(
                    eq(TodoTable.user_id, user_id),

                    todo_id ? eq(TodoTable.todo_id, todo_id) : undefined,
                    title ? eq(TodoTable.title, title) : undefined,
                    priority ? eq(TodoTable.priority, priority) : undefined,
                    status ? eq(TodoTable.status, status) : undefined,
                    progress ? eq(TodoTable.progress, progress) : undefined,
                ),
            );

        return result[0]?.count || 0;
    }

    async deleteTodoByIdRepo(body: IDeleteTodoByIdDtoIn) {
        const { todo_id } = body;

        const result = await this._db
            .delete(TodoTable)
            .where(eq(TodoTable.todo_id, todo_id))
            .returning();

        return result[0] || null;
    }

    async updateTodoByIdRepo(updateTodoByIdBody: IUpdateTodoDtoIn) {
        const { todo_id, ...updateFields } = updateTodoByIdBody;

        const cleanFields = Object.fromEntries(
            Object.entries(updateFields).filter(([_, v]) => v !== undefined),
        );

        const result = await this._db
            .update(TodoTable)
            .set({
                ...cleanFields,
                updatedAt: new Date(),
            })
            .where(eq(TodoTable.todo_id, todo_id!))
            .returning();

        return result[0] || null;
    }
}
