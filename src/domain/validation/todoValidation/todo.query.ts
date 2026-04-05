import { Type } from "@sinclair/typebox";
import { ETodoPriority, ETodoStatus } from "../../../definition";

// * CREATE NEW TODO QUERY
export const VCreateNewTodoDoInQuery = Type.Object({
    title: Type.String({ minLength: 1 }),
    body: Type.String({ minLength: 1 }),
    progress: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    user_id: Type.String(),
});

export const VCreateNewTodoDoOutResult = Type.Object({
    todo_id: Type.String(),
    title: Type.String({ minLength: 1 }),
    body: Type.String({ minLength: 1 }),
    progress: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    user_id: Type.String(),
});

// * DELETE TODO QUERY
export const VDeleteTodoByIdDtoInQuery = Type.Object({
    todo_id: Type.String(),
});
