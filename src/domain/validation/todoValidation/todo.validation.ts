import { Type } from "@sinclair/typebox";
import { ETodoPriority, ETodoStatus } from "../../../definition";

// * CREATE NEW TODO
export const VCreateNewTodoDoIn = Type.Object({
    title: Type.String({ minLength: 1 }),
    body: Type.String({ minLength: 1 }),
    progress: Type.Optional(Type.String()),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
});

export const VCreateNewTodoDoOut = Type.Object({
    todo_id: Type.String(),
    title: Type.String({ minLength: 1 }),
    body: Type.String({ minLength: 1 }),
    progress: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    user_id: Type.String(),
});

// * DELETE TODO
export const VDeleteTodoByIdDtoIn = Type.Object({
    todo_id: Type.String(),
});

// * UPDATE TODO
export const VUpdateTodoDtoIn = Type.Object({
    todo_id: Type.Optional(Type.String()),
    title: Type.Optional(Type.String()),
    body: Type.Optional(Type.String()),
    progress: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Enum(ETodoPriority)),
    status: Type.Optional(Type.Enum(ETodoStatus)),
});

export const VUpdateTodoDtoOut = Type.Object({
    title: Type.String(),
    body: Type.String(),
    progress: Type.String(),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
});

// * GET ALL TODOS WITH FILTER
export const VTodosWithFilterDtoIn = Type.Object({
    todo_id: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Enum(ETodoPriority)),
    status: Type.Optional(Type.Enum(ETodoStatus)),
    page: Type.Optional(Type.Number({ minimum: 1 })),
    limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});

export const VTodosWithFilterDtoOut = Type.Object({
    data: Type.Array(
        Type.Object({
            todo_id: Type.String(),
            title: Type.String(),
            priority: Type.Enum(ETodoPriority),
            status: Type.Enum(ETodoStatus),
            progress: Type.String(),
        }),
    ),
    page: Type.Number(),
    limit: Type.Number(),
    total: Type.Number(),
});

export const VTodoIdDto = Type.Object({
    todoId: Type.String(),
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
