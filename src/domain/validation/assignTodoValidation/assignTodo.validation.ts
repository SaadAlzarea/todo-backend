import { Type } from "@sinclair/typebox";
import { ETodoPriority, ETodoStatus } from "../../../definition";

// * CREATE ASSIGN TODO
export const VCreateAssignTodoInGroupProjectDtoIn = Type.Object({
    group_id: Type.String(),
    project_id: Type.String(),
    assign_to: Type.Array(
        Type.Object({
            user_id: Type.String(),
        }),
    ),
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
    assign_to: Type.Array(Type.String()),
    title: Type.String(),
    body: Type.String(),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    deadline: Type.String(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
});

// * GET ALL ASSIGN TODO
export const VGetAllAssignTodoInGroupProjectListDtoIn = Type.Object({
    group_id: Type.String(),
    project_id: Type.String(),
    user_username: Type.Optional(Type.String()),
});

export const VGetAllAssignTodoInGroupProjectListDtoOut = Type.Array(
    Type.Object({
        assign_todo_id: Type.String(),
        project_id: Type.String(),
        assign_from: Type.String(),
        assign_to: Type.String(),
        assign_from_username: Type.Union([Type.String(), Type.Null()]),
        assign_to_username: Type.Union([Type.String(), Type.Null()]),
        title: Type.String(),
        priority: Type.Union([Type.Enum(ETodoPriority), Type.Null()]),
        status: Type.Union([Type.Enum(ETodoStatus), Type.Null()]),
        isCompleted: Type.Boolean(),
        deadline: Type.Union([Type.Date(), Type.Null()]),
    }),
);

export const VGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn = Type.Object({
    assign_todo_id: Type.String(),
});
