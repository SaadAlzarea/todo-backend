import mongoose, { Model } from "mongoose";
import type {
    ITodoModel,
    ITodoDto,
    IDeleteTodoByIdDto,
    IUpdateTodoDtoIn,
    ITodoFilterQuery,
} from "../../domain";

export class TodoRepo {
    constructor(private readonly _todoModel: Model<ITodoModel>) {}

    async createNewTodoRepo(createNewTodo: ITodoDto, user: { generatedId: string; role: string }) {
        const body = {
            ...createNewTodo,
            userId: user.generatedId,
        };

        const createdData = await this._todoModel.create(body);
        return createdData;
    }

    async getAllAndFilterTodoByIdRepo(ITodoFilterQuery: ITodoFilterQuery) {
        const { query, page, limit } = ITodoFilterQuery;

        const skip = (page - 1) * limit;

        const allFilteredData = await this._todoModel
            .find(query)
            .select("generatedId title priority status progress -_id")
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .exec();

        return allFilteredData;
    }

    async getTotalTodoList(ITodoFilterQuery: ITodoFilterQuery) {
        const { query } = ITodoFilterQuery;
        const total = await this._todoModel.countDocuments(query);
        return total;
    }

    async deleteTodoByIdRepo(deleteTodoByIdBody: IDeleteTodoByIdDto) {
        const { todoId } = deleteTodoByIdBody;
        const deleteTodo = await this._todoModel.findByIdAndDelete({ generatedId: todoId });
        return deleteTodo;
    }

    async updateTodoByIdRepo(
        updateTodoByIdBody: IUpdateTodoDtoIn,
        session: mongoose.ClientSession,
    ) {
        // const { generatedId, ...updateFields } = body;
        const { generatedId, ...updateFields } = updateTodoByIdBody;

        const updatedTodo = await this._todoModel.findOneAndUpdate(
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
