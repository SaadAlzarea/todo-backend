import { Router } from "express";
import { TodoClass } from "../controller/todo.controller";

const router = Router();

// router.route("/list").get(getAllTodos);
const todoController = new TodoClass();

router
	.get("/get-todo-list", todoController.getAllTodos)
	.post("/added-todo", todoController.createNewTodo)
	.delete("/delete-todo", todoController.deleteTodoById)
	.put("/update-todo/:todoId", todoController.updateTodoById)
	.post("/get-todo-by-id/:todoId", todoController.getTodoById)
	.post("/get-todo-by-status", todoController.getTodoByStatus);

export default router;
