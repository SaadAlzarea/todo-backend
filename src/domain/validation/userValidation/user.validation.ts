import { Type } from "@sinclair/typebox";
import { EUserRole } from "../../../definition";

// * REGISTER
export const VRegisterDtoIn = Type.Object({
    username: Type.String(),
    email: Type.String(),
    password: Type.String(),
    role: Type.Optional(Type.Enum(EUserRole)),
});

export const VRegisterDtoOut = Type.Object({
    token: Type.String(),
    role: Type.Enum(EUserRole),
});

// * LOGIN
export const VLoginDtoIn = Type.Object({
    email: Type.String(),
    password: Type.String(),
});

export const VLoginDtoOut = Type.Object({
    token: Type.String(),
    role: Type.Enum(EUserRole),
});

// * GET ALL USER
export const VGetAllUserWithFilterDtoIn = Type.Object({
    user_id: Type.Optional(Type.String()),
    username: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    limit: Type.Number({ minimum: 1, maximum: 100 }),
});

export const VGetAllUserWithFilterDtoOut = Type.Object({
    data: Type.Object({
        data: Type.Array(
            Type.Object({
                user_id: Type.String(),
                username: Type.String(),
                email: Type.String(),
                role: Type.Enum(EUserRole),
                createdAt: Type.String({ format: "date-time" }),
                updatedAt: Type.String({ format: "date-time" }),
            }),
        ),
    }),
    limit: Type.Number(),
    total: Type.Number(),
});
