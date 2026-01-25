import { Type } from "@sinclair/typebox";
import { ETodoPriority, ETodoStatus } from "../../definition/enums/todo.enum";

export const VTodoDto = Type.Object({
	title: Type.Optional(Type.String()),
	body: Type.String(),
	priority: Type.Enum(ETodoPriority),
	status: Type.Enum(ETodoStatus),
});

export const VTodoIdDto = Type.Object({
	todoId: Type.Any(),
});

export const VTodoFilterDto = Type.Object({
	title: Type.Optional(Type.String()),
	body: Type.Optional(Type.String()),
	priority: Type.Optional(Type.Enum(ETodoPriority)),
	status: Type.Optional(Type.Enum(ETodoStatus)),
});