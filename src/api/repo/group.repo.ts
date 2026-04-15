import { group } from "node:console";
import { and, desc, eq, sql } from "drizzle-orm";
import { GroupMemberTable, GroupTable, UserTable } from "../../db";
import { EGroupMemberRole } from "../../definition";
import type {
    IAddMemberToGroupDtoInQuery,
    IAddNewMemberToGroupDtoInQuery,
    ICreateGroupDtoIn,
    ICreateGroupDtoInQuery,
    IDeleteGroupDtoIn,
    IDeleteMemberFromGroupDtoIn,
    IGetAllGroupMemberByIdDtoIn,
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

    async getUserEmailAndUsername(body: { member_user_id: string }, transactionDB = this._db) {
        const result = await transactionDB
            .select({ email: UserTable.email, username: UserTable.username })
            .from(UserTable)
            .where(eq(UserTable.user_id, body.member_user_id));

        return result[0] || null;
    }

    async checkAdminRoleInDeleteMember(body: { admin_user_id: string; group_id: string }) {
        const result = await this._db
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

    async deleteMemberFromGroup(body: IDeleteMemberFromGroupDtoIn) {
        const result = await this._db
            .delete(GroupMemberTable)
            .where(
                and(
                    eq(GroupMemberTable.user_id, body.member_user_id),
                    eq(GroupMemberTable.group_id, body.group_id),
                ),
            )
            .returning();

        return result[0] || null;
    }

    async getAllGroupMemberById(body: IGetAllGroupMemberByIdDtoIn) {
        const result = await this._db
            .select()
            .from(GroupMemberTable)
            .where(eq(GroupMemberTable.group_id, body.group_id));

        return result || null;
    }

    async deleteGroup(body: IDeleteGroupDtoIn) {
        const result = await this._db
            .delete(GroupTable)
            .where(and(eq(GroupTable.group_id, body.group_id)))
            .returning();

        return result || null;
    }
}
