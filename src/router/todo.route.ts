import { Router } from "express";
import { TodoClass } from "../controller/todo.controller";
import { todoPath } from "../paths/todo.path";
import { authorize } from "../middleware/authorize.middleware";

const router = Router();

// router.route("/list").get(getAllTodos);
const todoController = new TodoClass();
const {
    getTodoList,
    createNewTodo,
    deleteTodo,
    updateTodo,
    getTodoById,
    getTodoByStatus,
    todoFilters,
} = todoPath;
router
    .get(getTodoList, todoController.getAllTodosList)
    .post(createNewTodo, authorize("create", "Todo"), todoController.createNewTodo)
    .delete(deleteTodo, authorize("delete", "Todo"), todoController.deleteTodoById)
    .put(`${updateTodo}/:todoId`, authorize("update", "Todo"), todoController.updateTodoById)
    .post(getTodoById, todoController.getTodoDetailsById)
    .post(getTodoByStatus, todoController.getTodoByStatus)
    .post(todoFilters, todoController.getTodoFilter);

export default router;
