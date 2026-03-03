import mongoose from "mongoose";

import { Todo } from "../../domain/schema/todo.schema";
import {
    ITodoDto,
    IDeleteTodoByIdDto,
    IUpdateTodoDtoIn,
    ITodoFilterQuery,
} from "../../domain/DTOs/todo.dot";

export class TodoRepo {
    async createNewTodoRepo(createNewTodo: ITodoDto) {
        const body = createNewTodo;
        const createdData = await Todo.create(body);
        return createdData;
    }

    async getAllAndFilterTodoByIdRepo(ITodoFilterQuery: ITodoFilterQuery) {
        const { query, page, limit } = ITodoFilterQuery;

        const skip = (page - 1) * limit;

        const allFilteredData = await Todo.find(query)
            .select("generatedId title priority status progress -_id")
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .exec();

        return allFilteredData;
    }

    async getTotalTodoList(ITodoFilterQuery: ITodoFilterQuery) {
        const { query } = ITodoFilterQuery;
        const total = await Todo.countDocuments(query);
        return total;
    }

    async deleteTodoByIdRepo(deleteTodoByIdBody: IDeleteTodoByIdDto) {
        const { todoId } = deleteTodoByIdBody;
        const deleteTodo = await Todo.findByIdAndDelete({ generatedId: todoId });
        return deleteTodo;
    }

    async updateTodoByIdRepo(
        updateTodoByIdBody: IUpdateTodoDtoIn,
        session: mongoose.ClientSession,
    ) {
        // const { generatedId, ...updateFields } = body;
        const { generatedId, ...updateFields } = updateTodoByIdBody;

        const updatedTodo = await Todo.findOneAndUpdate(
            { generatedId },
            {
                $set: updateFields,
                $inc: { __v: 1 },
            },
            { new: true, session },
        );
        return updatedTodo;
    }
}
