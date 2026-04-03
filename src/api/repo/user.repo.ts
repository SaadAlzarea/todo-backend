import { eq } from "drizzle-orm";
import { UserTable } from "../../db";
import type { IRegisterDto } from "../../domain";

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

    async createNewUser(body: IRegisterDto) {
        const result = await this._db.insert(UserTable).values(body).returning();

        return result[0];
    }

    async checkLoginEmailAndGetUserInfo(email: string) {
        const result = await this._db
            .select({
                user_id: UserTable.user_id,
                username: UserTable.username,
                password: UserTable.password,
                role: UserTable.role,
            })
            .from(UserTable)
            .where(eq(UserTable.email, email))
            .limit(1);

        return result[0] || null;
    }

    async getAllUserForSuperAdmin() {
        const result = await this._db.select().from(UserTable);
        return result;
    }
}
