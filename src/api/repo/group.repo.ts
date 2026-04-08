import { GroupMemberTable, GroupTable } from "../../db";
import type {
    IAddMemberToGroupDtoInQuery,
    ICreateGroupDtoIn,
    ICreateGroupDtoInQuery,
} from "../../domain";
import type { GroupService } from "../services";

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
}
