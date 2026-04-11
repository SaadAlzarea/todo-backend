import { error } from "node:console";
import { is } from "drizzle-orm";
import { EGroupMemberRole } from "../../definition";
import type { IAddMemberToGroupDtoIn, ICreateGroupDtoIn } from "../../domain";
import { ensure } from "../../helper";
import { AppError } from "../../middleware";
import { BAD_REQUEST, UNAUTHORIZED } from "../../utils";
import type { GroupController } from "../controller";
import type { GroupMapper } from "../mapper/group.mapper";
import type { GroupRepo } from "../repo";

export class GroupService {
    constructor(
        private readonly _groupRepo: GroupRepo,
        private readonly _groupMapper: GroupMapper,
        private readonly _db: any,
    ) {}

    async createGroup(body: ICreateGroupDtoIn, user: { user_id: string }) {
        return await this._db.transaction(async (TransactionDB: any) => {
            const mapperToCreateGroup = this._groupMapper.mapperInCreateGroup(body, user);

            const createdGroup = await this._groupRepo.createGroup(
                mapperToCreateGroup,
                TransactionDB,
            );
            ensure(createdGroup, "Error in create group", BAD_REQUEST);

            const mapperToAddAdminMemberToGroup = this._groupMapper.mapperToAddAdminMemberToGroup(
                createdGroup,
                user,
            );

            const addAdminMemberToGroup = await this._groupRepo.memberGroupCreated(
                mapperToAddAdminMemberToGroup,
                TransactionDB,
            );

            ensure(
                addAdminMemberToGroup,
                `Error in create group owner in group with id ${createdGroup.group_id}`,
                BAD_REQUEST,
            );

            return createdGroup;
        });
    }
    async addedNewMemberToGroup(body: IAddMemberToGroupDtoIn, AdminUserinfo: { user_id: string }) {
        return await this._db.transaction(async (transactionDB: any) => {
            const mapperToCheckIsAdmin = this._groupMapper.mapperToCheckIsAdmin(
                body,
                AdminUserinfo,
            );
            // if this user admin or not
            const isAdmin = await this._groupRepo.checkAdminRole(
                mapperToCheckIsAdmin,
                transactionDB,
            );

            ensure(
                isAdmin?.group_member_role === EGroupMemberRole.ADMIN,
                "You are unauthorized",
                UNAUTHORIZED,
            );

            const mapperToAddedNewMemberToGroup =
                this._groupMapper.mapperToAddedNewMemberToGroup(body);
            console.log("i am here ");

            try {
                const result = await this._groupRepo.addMember(
                    transactionDB,
                    mapperToAddedNewMemberToGroup,
                );
                return result;
            } catch (error: any) {
                if (error?.cause?.code === "23505") {
                    throw new AppError(
                        `User with user id ${mapperToAddedNewMemberToGroup.member_user_id} already added to this group`,
                        BAD_REQUEST,
                    );
                }

                throw error;
            }
        });
    }
}
