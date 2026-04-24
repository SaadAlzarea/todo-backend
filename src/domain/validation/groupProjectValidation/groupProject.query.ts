import { Type } from "@sinclair/typebox";

export const VCreateGroupProjectDtoInQuery = Type.Object({
    project_name: Type.String(),
    group_id: Type.String(),
    created_by: Type.String(),
    project_deadline: Type.Date(),
});

export const VCreateGroupProjectDtoOutResult = Type.Object({
    project_id: Type.String(),
    project_name: Type.String(),
    group_id: Type.String(),
    created_by: Type.String(),
    project_deadline: Type.Date(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
});

// * DELETE GROUP PROJECT
export const VCheckIsAdminToDeleteGroupProjectDtoInQuery = Type.Object({
    group_id: Type.String(),
    user_id: Type.String(),
});

export const VDeleteGroupProjectDtoInQuery = Type.Object({
    group_id: Type.String(),
    project_id: Type.String(),
});
