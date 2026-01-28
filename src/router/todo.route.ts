import { Router } from "express";
import { TodoClass } from "../controller/todo.controller";

const router = Router();

// router.route("/list").get(getAllTodos);
const todoController = new TodoClass();

router
    .get("/get-todo-list", todoController.getAllTodosList)
    .post("/added-todo", todoController.createNewTodo)
    .delete("/delete-todo", todoController.deleteTodoById)
    .put("/update-todo/:todoId", todoController.updateTodoById)
    .post("/get-todo-by-id", todoController.getTodoDetailsById)
    .post("/get-todo-by-status", todoController.getTodoByStatus)
    .post("/todo-filters", todoController.getTodoFilter);

export default router;
