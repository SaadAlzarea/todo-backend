import { Type } from "@sinclair/typebox";
import { ETodoPriority, ETodoStatus } from "../../../definition";

// * PERSONAL PROJECT
export const VCreatePersonalProjectDtoInQuery = Type.Object({
    user_id: Type.String(),
    project_name: Type.String(),
    project_deadline: Type.Date(),
});

// * CREATE NEW TODO QUERY
export const VCreateNewProjectTodoDtoInQuery = Type.Object({
    project_id: Type.String(),
    title: Type.String({ minLength: 1 }),
    body: Type.String({ minLength: 1 }),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    todo_deadline: Type.Date(),
    user_id: Type.String(),
});

export const VCreateNewProjectTodoDtoOutResult = Type.Object({
    todo_id: Type.String(),
    project_id: Type.String(),
    user_id: Type.String(),
    title: Type.String(),
    body: Type.String(),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    todo_deadline: Type.Date(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
});

// * DELETE TODO QUERY
export const VDeleteTodoByIdDtoInQuery = Type.Object({
    todo_id: Type.String(),
});
