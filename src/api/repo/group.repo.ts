import { group } from "node:console";
import { and, desc, eq, sql } from "drizzle-orm";
import { GroupMemberTable, GroupTable } from "../../db";
import { EGroupMemberRole } from "../../definition";
import type {
    IAddMemberToGroupDtoInQuery,
    IAddNewMemberToGroupDtoInQuery,
    ICreateGroupDtoIn,
    ICreateGroupDtoInQuery,
} from "../../domain";

export class GroupRepo {
    constructor(private readonly _db: any) {}

    async createGroup(body: ICreateGroupDtoInQuery, transactionDB = this._db) {
        const result = await transactionDB.insert(GroupTable).values(body).returning();
        return result[0];
    }

    async memberGroupCreated(body: IAddMemberToGroupDtoInQuery, transactionDB = this._db) {
        const result = await transactionDB.insert(GroupMemberTable).values(body).returning();
        return result[0] || null;
    }

    async checkAdminRole(
        body: { admin_user_id: string; group_id: string },
        transactionDB = this._db,
    ) {
        const result = await transactionDB
            .select({
                group_member_role: GroupMemberTable.group_member_role,
            })
            .from(GroupMemberTable)
            .where(
                and(
                    eq(GroupMemberTable.user_id, body.admin_user_id),
                    eq(GroupMemberTable.group_id, body.group_id),
                ),
            )
            .limit(1);

        return result[0] || null;
    }

    async addMember(transactionDB = this._db, body: IAddNewMemberToGroupDtoInQuery) {
        const result = await transactionDB
            .insert(GroupMemberTable)
            .values({
                group_id: body.group_id,
                user_id: body.member_user_id,
                group_member_role: EGroupMemberRole.MEMBER,
            })
            .returning();

        return result[0] || null;
    }
}
