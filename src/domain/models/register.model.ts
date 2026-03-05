import { EUserRole } from "../../definition";

export interface IRegisterModel {
    generatedId: string;
    username: string;
    email: string;
    password: string;
    role: EUserRole;
}
