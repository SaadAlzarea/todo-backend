import type { EUserRole } from "../../definition";
import type {
    IGetAllUserWithFilterDtoIn,
    ILoginDtoInQuery,
    ILoginDtoOutResult,
    IRegisterDtoInQuery,
    IRegisterDtoOutResult,
} from "../../domain";

export class UserMapper {
    mapperInRegisterService(
        body: { username: string; email: string },
        hashPass: string,
    ): IRegisterDtoInQuery {
        return {
            username: body.username,
            email: body.email,
            password: hashPass,
        };
    }

    mapperOutRegisterService(body: {
        user_id: string;
        email: string;
        role: EUserRole;
    }): IRegisterDtoOutResult {
        return {
            user_id: body.user_id,
            email: body.email,
            role: body.role,
        };
    }

    mapperOutToGetLoginUser(body: { user_id: string; email: string; role: EUserRole }) {
        return {
            user_id: body.user_id,
            email: body.email,
            role: body.role,
        };
    }

    mapperInGetAllUserForSuperAdmin(body: {
        username?: string;
        email?: string;
        user_id?: string;
        limit: number;
    }) {
        return {
            username: body.username,
            email: body.email,
            user_id: body.user_id,
            limit: body.limit,
        };
    }
}
