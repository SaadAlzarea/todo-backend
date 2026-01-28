import { Request, Response } from "express-serve-static-core";
import mongoose from "mongoose";
import { validator } from "../adapter/validator.adapter";
import { ITodoDto } from "../domain/DTOs/todo.dot";
import { VTodoDto, VTodoFilterDto, VTodoIdDto } from "../domain/validation/todo.validation";
import { Todo } from "../schema/todo.schema";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../utils/http-status";

export class TodoClass {

	// git list 
	async getAllTodosList(req: Request, res: Response): Promise<void> {
		try {
			const todoList = await Todo.find().select('generatedId title priority status -_id');
			res.status(OK).json({
				data: todoList,
			});
		} catch (error) {
			res.status(BAD_REQUEST).json({
				error: `Error in get Todo List ${error}`,
			});
		}
	}

	// create todo
	async createNewTodo(
		req: Request<{}, {}, ITodoDto>,
		res: Response,
	): Promise<void> {
		const body = req.body;
		const { error: bodyValidationError } = validator(VTodoDto, body);
		try {
			if (bodyValidationError.length > 0) {
				res.status(BAD_REQUEST).json({
					message: `inputs is not valid`,
					error: bodyValidationError,
				});
				return;
			}
			// else
			await Todo.create(body);
			res.status(CREATED).json({
				message: `Created successfully`,
				data: body
			});
		} catch (error) {
			res.status(BAD_REQUEST).json({
				message: `Fail in created ${error}`,
			});
		}
	}

	// delete todo
	async deleteTodoById(req: Request, res: Response): Promise<void> {
		try {
			const todoId = req.body.todoId;
			await Todo.findByIdAndDelete(todoId);
			res.status(OK).json({
				message: `Deleted successfully`,
			});
		} catch (error) {
			res.status(BAD_REQUEST).json({
				message: `Deleted failed`,
			});
		}
	}

	//  update and __v+1
	async updateTodoById(req: Request, res: Response): Promise<void> {
		const todoId = req.params.todoId;
		const { error: todoIdValidation } = validator(VTodoIdDto, { todoId });

		const body = req.body;
		const { error: bodyValidationError } = validator(VTodoDto, body);

		const session = await mongoose.startSession();
		try {
			session.startTransaction();

			// ID
			if (todoIdValidation.length > 0) {
				res.status(BAD_REQUEST).json({
					message: `Id isn't valid ${todoId}`,
					errors: todoIdValidation,
				});
				return;
			}

			// Body
			if (bodyValidationError.length > 0) {
				res.status(BAD_REQUEST).json({
					message: `Body isn't valid`,
					error: bodyValidationError,
				});
				return;
			}

			// Update
			const updatedData = await Todo.findOneAndUpdate(
				{ _id: todoId },
				{ ...body, $inc: { __v: 1 } },
				{
					new: true,
				},
			);
			res.status(OK).json({
				message: `Updated is successfully`,
				data: updatedData,
			});
			await session.commitTransaction();
		} catch {
			await session.abortTransaction();
			res.status(BAD_REQUEST).json({
				message: `updated  failed `,
			});
		} finally {
			session.endSession();
		}
	}

	// details
	async getTodoDetailsById(req: Request, res: Response): Promise<void> {
		const todoId = req.body.todoId;
		const { error: getTodoByIdError } = validator(VTodoIdDto, { todoId });
		try {
			if (getTodoByIdError.length > 0) {
				res.status(BAD_REQUEST).json({
					message: `This ID is'nt valid`,
					error: getTodoByIdError,
				});
				return;
			}
			const SearchedTodoById = await Todo.findById(todoId);
			res.status(OK).json({
				data: SearchedTodoById,
			});
		} catch (error) {
			res.status(NOT_FOUND).json({
				message: `No result ${error}`,
			});
		}
	}

	async getTodoByStatus(req: Request, res: Response): Promise<void> {
		const status = req.body.status;

		try {
			const SearchedTodoByStatus = await Todo.find({ status });
			res.status(OK).json({
				data: SearchedTodoByStatus,
			});
		} catch (error) {
			res.status(NOT_FOUND).json({
				message: `Error in search`,
				error: error,
			});
		}
	}

	async getTodoFilter(req: Request, res: Response): Promise<void> {
		const body = req.body;

		const { error: filterBodyError } = validator(VTodoFilterDto, body);

		if (filterBodyError.length > 0) {
			res.status(BAD_REQUEST).json({
				message: "Invalid body",
				error: filterBodyError,
			});
			return;
		}

		try {
			const query: any = {};

			if (body?.generatedId) {
				query.generatedId = body.generatedId;
			}

			if (body?.priority) {
				query.priority = body.priority;
			}

			if (body?.status) {
				query.status = body.status;
			}

			const filteredTodo = await Todo.find(query);

			res.status(OK).json({
				data: filteredTodo,
			});
		} catch (error) {
			res.status(INTERNAL_SERVER_ERROR).json({
				message: "Error filtering todos",
				error,
			});
		}

	}
}
