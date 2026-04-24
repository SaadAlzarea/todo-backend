import { and, eq } from "drizzle-orm";
import { GroupMemberTable, GroupProjectTable } from "../../db";
import type {
    ICheckIsAdminToDeleteGroupProjectDtoInQuery,
    ICreateGroupProjectDtoInQuery,
    ICreateGroupProjectDtoOutResult,
    IDeleteGroupProjectDtoInQuery,
} from "../../domain";

export class GroupProjectRepo {
    constructor(private readonly _db: any) {}

    async createGroupProject(
        body: ICreateGroupProjectDtoInQuery,
    ): Promise<ICreateGroupProjectDtoOutResult> {
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
}
