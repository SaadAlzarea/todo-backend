import { Type } from "@sinclair/typebox";
import { ETodoPriority, ETodoStatus } from "../../../definition";

export const VCreateAssignTodoInGroupProjectDtoIn = Type.Object({
    group_id: Type.String(),
    project_id: Type.String(),
    assign_to: Type.String(),
    title: Type.String(),
    body: Type.String(),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    deadline: Type.String(),
});

export const VCreateAssignTodoInGroupProjectDtoOut = Type.Object({
    assign_todo_id: Type.String(),
    group_id: Type.String(),
    project_id: Type.String(),
    assign_from: Type.String(),
    assign_to: Type.String(),
    title: Type.String(),
    body: Type.String(),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    deadline: Type.String(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
});
