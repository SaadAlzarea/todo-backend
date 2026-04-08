import { promises } from "node:dns";
import { and, desc, eq, sql } from "drizzle-orm";
import { UserTable } from "../../db";
import type {
    IDeleteUserByAdminDtoIn,
    IGetAllUserWithFilterDtoIn,
    IGetTodoDetailsDtoIn,
    ILoginDtoInQuery,
    ILoginDtoOutResult,
    IRegisterDtoIn,
    IRegisterDtoInQuery,
    IRegisterDtoOut,
} from "../../domain";

export class UserRepo {
    constructor(private readonly _db: any) {}

    // check username exists
    async checkUsername(username: string) {
        const result = await this._db
            .select({ user: UserTable.user_id })
            .from(UserTable)
            .where(eq(UserTable.username, username))
            .limit(1);

        return result.length > 0;
    }
    // check email exists
    async checkEmail(email: string) {
        const result = await this._db
            .select({ user: UserTable.user_id })
            .from(UserTable)
            .where(eq(UserTable.email, email))
            .limit(1);

        return result.length > 0;
    }

    async registerRepository(body: IRegisterDtoInQuery) {
        const result = await this._db.insert(UserTable).values(body).returning();

        return result[0];
    }

    async checkLoginEmailAndGetUserInfo(body: ILoginDtoInQuery) {
        const result = await this._db
            .select({
                user_id: UserTable.user_id,
                username: UserTable.username,
                password: UserTable.password,
                role: UserTable.role,
            })
            .from(UserTable)
            .where(eq(UserTable.email, body.email))
            .limit(1);

        return result[0] || null;
    }

    async getAllUserForSuperAdmin(body: IGetAllUserWithFilterDtoIn) {
        const result = await this._db
            .select({
                user_id: UserTable.user_id,
                username: UserTable.username,
                email: UserTable.email,
                role: UserTable.role,
                createdAt: UserTable.createdAt,
                updatedAt: UserTable.updatedAt,
            })
            .from(UserTable)
            .where(
                and(
                    ...(body.user_id ? [eq(UserTable.user_id, body.user_id)] : []),
                    ...(body.username ? [eq(UserTable.username, body.username)] : []),
                    ...(body.email ? [eq(UserTable.email, body.email)] : []),
                ),
            )
            .limit(body.limit)
            .orderBy(desc(UserTable.createdAt));

        return result;
    }

    async getTotalUserCount(body: IGetAllUserWithFilterDtoIn): Promise<number> {
        const result = await this._db
            .select({
                count: sql<number>`COUNT(*)`,
            })
            .from(UserTable)
            .where(
                and(
                    body.user_id ? eq(UserTable.user_id, body.user_id) : undefined,
                    body.username ? eq(UserTable.username, body.username) : undefined,
                    body.email ? eq(UserTable.email, body.email) : undefined,
                ),
            );

        return result[0]?.count || 0;
    }

    async deleteUserByAdmin(body: IDeleteUserByAdminDtoIn) {
        const result = await this._db
            .delete(UserTable)
            .where(eq(UserTable.user_id, body.user_id))
            .returning();

        return result[0] || null;
    }
}
