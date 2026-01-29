import { EUserRole } from "../definition/enums/userRole.role";

export interface IRegisterModel {
    generatedId: string;
    username: string;
    email: string;
    password: string;
    role: EUserRole;
}
