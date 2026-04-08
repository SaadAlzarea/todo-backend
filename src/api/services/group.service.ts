import type { ICreateGroupDtoIn } from "../../domain";
import { ensure } from "../../helper";
import { BAD_REQUEST } from "../../utils";
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
}
