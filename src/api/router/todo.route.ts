import { Router } from "express";
import { todoPath } from "../../domain/paths/todo.path";
import { authorize } from "../../middleware/authorize.middleware";
import { di } from "../../di";
import { expressAdapter } from "../../adapter/express.adapter";

export const todoRouter = Router();

// router.route("/list").get(getAllTodos);
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
        authorize("create", "Todo"),
        expressAdapter(todoController.createNewTodo.bind(todoController)),
    )
    .delete(
        deleteTodo,
        authorize("delete", "Todo"),
        expressAdapter(todoController.deleteTodoById.bind(todoController)),
    )
    .put(
        `${updateTodo}/:todoId`,
        authorize("update", "Todo"),
        expressAdapter(todoController.updateTodoById.bind(todoController)),
    )
    .post(todoFilters, expressAdapter(todoController.getTodoFilter.bind(todoController)));
