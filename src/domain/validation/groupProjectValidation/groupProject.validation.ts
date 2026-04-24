import { Type } from "@sinclair/typebox";

// * CREATE GROUP PROJECT
export const VCreateGroupProjectDtoIn = Type.Object({
    project_name: Type.String(),
    group_id: Type.String(),
    project_deadline: Type.String(),
});

export const VCreateGroupProjectDtoOut = Type.Object({
    project_id: Type.String(),
    project_name: Type.String(),
    group_id: Type.String(),
    created_by: Type.String(),
    project_deadline: Type.Date(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
});

// * DELETE GROUP PROJECT
export const VDeleteGroupProjectDtoIn = Type.Object({
    project_id: Type.String(),
    group_id: Type.String(),
});

// * EDIT GROUP PROJECT
export const VEditGroupProjectDtoIn = Type.Object({
    project_id: Type.String(),
    project_name: Type.String(),
    project_deadline: Type.Date(),
    updatedAt: Type.Date(),
});
