import { todo } from "node:test";
import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { todoPath } from "../../domain";
import { authMiddleware, authorize } from "../../middleware";

export const todoRouter = Router();

const { projectTodoController } = di;
const { getTodoDetails, createNewTodo, deleteTodo, updateTodo, todoFilters } = todoPath;

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
        expressAdapter(projectTodoController.createNewTodo.bind(projectTodoController)),
    )
    .delete(
        deleteTodo,
        authMiddleware,
        authorize("delete", "Todo"),
        expressAdapter(projectTodoController.deleteTodoById.bind(projectTodoController)),
    )
    .put(
        `${updateTodo}`,
        authMiddleware,
        authorize("update", "Todo"),
        expressAdapter(projectTodoController.updateTodoById.bind(projectTodoController)),
    )
    .post(
        todoFilters,
        authMiddleware,
        expressAdapter(projectTodoController.getTodoWithFilterAndLimit.bind(projectTodoController)),
    )
    .post(
        getTodoDetails,
        expressAdapter(projectTodoController.getTodoDetailsController.bind(projectTodoController)),
    );
