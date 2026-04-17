import type { Static } from "@sinclair/typebox";
import type {
    VCreatePersonalProjectDtoInQuery,
    VDeletePersonalProjectDtoIn,
    VGetAllPersonalProjectDtoOut,
} from "../../validation";

// ! PERSONAL PROJECT
// * CREATE PERSONAL PROJECT
export interface ICreatePersonalProjectDtoInQuery
    extends Static<typeof VCreatePersonalProjectDtoInQuery> {}

// * DELETE PERSONAL PROJECT
export interface IDeletePersonalProjectDtoIn extends Static<typeof VDeletePersonalProjectDtoIn> {}

// * GET ALL PERSONAL PROJECT
export interface IGetAllPersonalProjectDtoOut extends Static<typeof VGetAllPersonalProjectDtoOut> {}
