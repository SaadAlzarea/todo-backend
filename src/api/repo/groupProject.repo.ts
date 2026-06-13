import { and, eq, inArray } from "drizzle-orm";
import { GroupMemberTable, GroupProjectTable, UserTable } from "../../db";
import type {
    ICheckIsAdminToDeleteGroupProjectDtoInQuery,
    ICreateGroupProjectDtoInQuery,
    ICreateGroupProjectDtoOutResult,
    IDeleteGroupProjectDtoInQuery,
    IGetAllGroupProjectsDtoIn,
} from "../../domain";

export class GroupProjectRepo {
    constructor(private readonly _db: any) {}

    // async createGroupProject(
    //     body: ICreateGroupProjectDtoInQuery,
    // ): Promise<ICreateGroupProjectDtoOutResult> {
    //     const result = await this._db
    //         .insert(GroupProjectTable)
    //         .values({
    //             project_name: body.project_name,
    //             group_id: body.group_id,
    //             created_by: body.created_by,
    //             project_deadline: body.project_deadline,
    //         })
    //         .returning();

    //     return result[0] || null;
    // }
    async createGroupProject(
        body: ICreateGroupProjectDtoInQuery,
    ): Promise<ICreateGroupProjectDtoOutResult> {
        try {
            const result = await this._db
                .insert(GroupProjectTable)
                .values({
                    project_name: body.project_name,
                    group_id: body.group_id,
                    created_by: body.created_by,
                    project_deadline: body.project_deadline,
                })
                .returning();

            return result[0] || null;
        } catch (error: any) {
            console.error("ERROR:");
            console.error(error);

            console.error("CAUSE:");
            console.error(error?.cause);

            console.error("DETAIL:");
            console.error(error?.cause?.detail);

            console.error("CONSTRAINT:");
            console.error(error?.cause?.constraint);

            throw error;
        }
    }

    async checkIsGroupAdmin(body: ICheckIsAdminToDeleteGroupProjectDtoInQuery) {
        const result = await this._db
            .select({
                group_id: GroupMemberTable.group_id,
                user_id: GroupMemberTable.user_id,
                group_member_role: GroupMemberTable.group_member_role,
            })
            .from(GroupMemberTable)
            .where(
                and(
                    eq(GroupMemberTable.user_id, body.user_id),
                    eq(GroupMemberTable.group_id, body.group_id),
                ),
            );
        return result[0] || null;
    }
    async deleteGroupProject(body: IDeleteGroupProjectDtoInQuery) {
        const result = await this._db
            .delete(GroupProjectTable)
            .where(
                and(
                    eq(GroupProjectTable.group_id, body.group_id),
                    eq(GroupProjectTable.project_id, body.project_id),
                ),
            )
            .returning();

        return result[0] || null;
    }

    async getAllGroupProject(body: IGetAllGroupProjectsDtoIn) {
        const result = await this._db
            .select({
                project_name: GroupProjectTable.project_name,
                created_by: GroupProjectTable.created_by,
                project_deadline: GroupProjectTable.project_deadline,
            })
            .from(GroupProjectTable)
            .where(eq(GroupProjectTable.group_id, body.group_id));

        return result || null;
    }

    async getGroupProjectCreator(body: { user_id: string }[]) {
        const result = await this._db
            .select({
                user_id: UserTable.user_id,
                username: UserTable.username,
            })
            .from(UserTable)
            .where(
                inArray(
                    UserTable.user_id,
                    body.map((user) => user.user_id),
                ),
            );

        return result || null;
    }
}
