import { Type } from "@sinclair/typebox";
import { ETodoPriority, ETodoStatus } from "../../../definition";

// group_id: body.group_id,
// project_id: body.project_id,
// assign_from: user.user_id,
// assign_to: body.assign_to,
// title: body.title,
// body: body.body,
// priority: body.priority,
// status: body.status,
// deadline: deadline.deadline,
// export const VCreateAssignTodoInGroupProjectDtoInQuery = Type.Object({
//     assign_todo_id: Type.String(),
//     group_id: Type.String(),
//     project_id: Type.String(),
//     assign_from: Type.String(),
//     assign_to: Type.String(),
//     title: Type.String(),
//     body: Type.String(),
//     priority: Type.Enum(ETodoPriority),
//     status: Type.Enum(ETodoStatus),
//     deadline: Type.String(),
//     createdAt: Type.Date(),
//     updatedAt: Type.Date(),
// });
export const VCreateAssignTodoInGroupProjectDtoInQuery = Type.Object({
    group_id: Type.String(),
    project_id: Type.String(),
    assign_from: Type.String(),
    assign_to: Type.String(),
    title: Type.String(),
    body: Type.String(),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    deadline: Type.Date(),
});

export const VCreateAssignTodoInGroupProjectDtoOutResult = Type.Object({
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
