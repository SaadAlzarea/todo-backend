import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { todoPath } from "../../domain";
import { authMiddleware, authorize } from "../../middleware";

export const todoRouter = Router();

const { todoController } = di;
const { getTodoList, createNewTodo, deleteTodo, updateTodo, todoFilters } = todoPath;

todoRouter
    // .post(
    //     getTodoList,
    //     authMiddleware,
    //     expressAdapter(todoController.getTodoFilter.bind(todoController)),
    // )
    .post(
        createNewTodo,
        authMiddleware,
        authorize("create", "Todo"),
        expressAdapter(todoController.createNewTodo.bind(todoController)),
    )
    .delete(
        deleteTodo,
        authMiddleware,
        authorize("delete", "Todo"),
        expressAdapter(todoController.deleteTodoById.bind(todoController)),
    )
    .put(
        `${updateTodo}`,
        authMiddleware,
        authorize("update", "Todo"),
        expressAdapter(todoController.updateTodoById.bind(todoController)),
    )
    .post(
        todoFilters,
        authMiddleware,
        expressAdapter(todoController.getTodoWithFilterAndLimit.bind(todoController)),
    );
