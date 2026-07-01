import { Type } from "@sinclair/typebox";

export const VCreatePersonalTodoCommentDtoIn = Type.Object({
    todo_id: Type.String(),
    body: Type.String(),
});

export const VCreatePersonalTodoCommentDtoOut = Type.Object({
    comment_id: Type.String(),
    todo_id: Type.String(),
    user_id: Type.String(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
    body: Type.String(),
});
