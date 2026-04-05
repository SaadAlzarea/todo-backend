import type { EUserRole } from "../../definition";

export class UserMapper {
    mapperInToNewUser(body: { username: string; email: string }, hashPass: string) {
        return {
            username: body.username,
            email: body.email,
            password: hashPass,
        };
    }

    mapperOutToNewUser(body: { user_id: string; email: string; role: EUserRole }) {
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
}
