import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { todoPath } from "../../domain";
import { authorize } from "../../middleware";

export const todoRouter = Router();

const { todoController } = di;
const {
    getTodoList,
    createNewTodo,
    deleteTodo,
    updateTodo,
    getTodoById,
    getTodoByStatus,
    todoFilters,
} = todoPath;

todoRouter
    .post(getTodoList, expressAdapter(todoController.getTodoFilter.bind(todoController)))
    .post(
        createNewTodo,
        // authorize("create", "Todo"),
        expressAdapter(todoController.createNewTodo.bind(todoController)),
    )
    .delete(
        deleteTodo,
        // authorize("delete", "Todo"),
        expressAdapter(todoController.deleteTodoById.bind(todoController)),
    )
    .put(
        `${updateTodo}/:todoId`,
        // authorize("update", "Todo"),
        expressAdapter(todoController.updateTodoById.bind(todoController)),
    )
    .post(todoFilters, expressAdapter(todoController.getTodoFilter.bind(todoController)));
