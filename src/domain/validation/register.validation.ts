import { Type } from "@sinclair/typebox";
import { emit } from "node:cluster";

export const VRegisterDto = Type.Object({
    username : Type.String(),
    email : Type.String(),
    password : Type.String()
})

export const VLoginDto = Type.Object({
    email : Type.String(),
    password : Type.String()
})