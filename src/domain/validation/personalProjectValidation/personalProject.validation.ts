import { Type } from "@sinclair/typebox";

// ! PERSONAL PROJECT
// * CREATE PROJECT
export const VCreatePersonalProjectDtoIn = Type.Object({
    project_name: Type.String(),
    project_deadline: Type.String(),
});

// * DELETE PERSONAL PROJECT
export const VDeletePersonalProjectDtoIn = Type.Object({
    project_id: Type.String(),
});

export const VGetAllPersonalProjectDtoOut = Type.Object({
    data: Type.Array(
        Type.Object({
            project_name: Type.String(),
            project_id: Type.String(),
            project_deadline: Type.String(),
            createdAt: Type.String(),
        }),
    ),
    message: Type.String(),
});
