import type { EUserRole } from "../../definition";

export class UserMapper {
    mapperInToNewUser(body: { username: string; email: string }, hashPass: string) {
        return {
            username: body.username,
            email: body.email,
            password: hashPass,
        };
    }

    mapperOutToNewUser(body: { generatedId: string; email: string; role: EUserRole }) {
        return {
            id: body.generatedId,
            email: body.email,
            role: body.role,
        };
    }

    mapperOutToGetLoginUser(body: { generatedId: string; email: string; role: EUserRole }) {
        return {
            id: body.generatedId,
            email: body.email,
            role: body.role,
        };
    }
}
