import { Type } from "@sinclair/typebox";
import { EUserRole } from "../../../definition";

// * REGISTER
export const VRegisterDtoInQuery = Type.Object({
    username: Type.String(),
    email: Type.String(),
    password: Type.String(),
});

export const VRegisterDtoOutResult = Type.Object({
    user_id: Type.String(),
    email: Type.String(),
    role: Type.Enum(EUserRole),
});

// * LOGIN
export const VLoginDtoInQuery = Type.Object({
    email: Type.String(),
});
export const VLoginDtoOutResult = Type.Object({
    user_id: Type.String(),
    email: Type.String(),
    password: Type.String(),
    role: Type.Enum(EUserRole),
});

// * GET ALL USER
export const VGetAllUserWithFilterDtoInQuery = Type.Object({
    user_id: Type.Optional(Type.String()),
    username: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    limit: Type.Number({ minimum: 1, maximum: 100 }),
});
