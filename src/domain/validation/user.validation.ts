import { Type } from "@sinclair/typebox";
import { EUserRole } from "../../definition";

export const VRegisterDto = Type.Object({
    username: Type.String(),
    email: Type.String(),
    password: Type.String(),
    role: Type.Optional(Type.Enum(EUserRole)),
});

export const VLoginDto = Type.Object({
    email: Type.String(),
    password: Type.String(),
    role: Type.Optional(Type.Enum(EUserRole)),
});
