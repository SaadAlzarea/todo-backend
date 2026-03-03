import { Type } from "@sinclair/typebox";
import { ETodoPriority, ETodoStatus } from "../../definition/enums/todo.enum";

export const VTodoDto = Type.Object({
    todoId: Type.Optional(Type.String()),
    title: Type.String(),
    body: Type.String(),
    progress: Type.Optional(Type.String()),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
});

export const VTodoIdDto = Type.Object({
    todoId: Type.String(),
});

export const VDeleteTodoByIdDto = Type.Object({
    todoId: Type.String(),
});

export const VTodoFilterDto = Type.Object({
    page: Type.Number(),
    limit: Type.Number(),
    generatedId: Type.Optional(Type.String()),
    title: Type.Optional(Type.String()),
    body: Type.Optional(Type.String()),
    progress: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Enum(ETodoPriority)),
    status: Type.Optional(Type.Enum(ETodoStatus)),
});
export const VTodoFilterQuery = Type.Object({
    page: Type.Number(),
    limit: Type.Number(),
    query: Type.Object({
        generatedId: Type.Optional(Type.String()),
        priority: Type.Optional(Type.Enum(ETodoPriority)),
        status: Type.Optional(Type.Enum(ETodoStatus)),
    }),
});

export const VUpdateTodoDtoIn = Type.Object({
    todoId: Type.Optional(Type.String()),
    generatedId: Type.String(),
    title: Type.Optional(Type.String()),
    body: Type.Optional(Type.String()),
    progress: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Enum(ETodoPriority)),
    status: Type.Optional(Type.Enum(ETodoStatus)),
});
