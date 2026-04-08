import { EUserRole } from "../../definition";
import type {
    IDeleteUserByAdminDtoIn,
    IGetAllUserWithFilterDtoIn,
    IGetAllUserWithFilterDtoInQuery,
    IGetAllUserWithFilterDtoOut,
    ILoginDtoIn,
    ILoginDtoOut,
    IRegisterDtoIn,
    IRegisterDtoOut,
} from "../../domain";
import { ensure } from "../../helper";
import { requireRole } from "../../helper/isAdmin.helper";
import { AppError } from "../../middleware";
import { BAD_REQUEST, comparePassword, FORBIDDEN, generateToken, hashPassword } from "../../utils";
import type { UserMapper } from "../mapper";
import type { UserRepo } from "../repo";

export class UserService {
    constructor(
        private readonly _userRepo: UserRepo,
        private readonly _userMapper: UserMapper,
    ) {}

    async registerService(body: IRegisterDtoIn): Promise<IRegisterDtoOut> {
        const { email, username, password } = body;

        // check inputs and hash pass
        if (await this._userRepo.checkUsername(username)) {
            throw new AppError("username is exist", BAD_REQUEST);
        }
        if (await this._userRepo.checkEmail(email)) {
            throw new AppError("Email Is exist", BAD_REQUEST);
        }
        const hashPass = await hashPassword(password);

        // mapper In
        const mapperInToNewUser = this._userMapper.mapperInRegisterService(body, hashPass);

        // create user
        const newUserInfo = await this._userRepo.registerRepository(mapperInToNewUser);

        ensure(newUserInfo, "Error in create user in service ", BAD_REQUEST);

        // mapper out
        const mapperOutToNewUser = this._userMapper.mapperOutRegisterService(newUserInfo);

        // generate token
        const token = generateToken(mapperOutToNewUser);

        return {
            token,
            role: mapperOutToNewUser.role,
        };
    }

    async userLoginService(body: ILoginDtoIn): Promise<ILoginDtoOut> {
        const { password, email } = body;

        const userInfo = await this._userRepo.checkLoginEmailAndGetUserInfo({ email });

        ensure(userInfo, "Error in login Service", BAD_REQUEST);

        const storedPassword = userInfo.password;
        const comparePass = await comparePassword(storedPassword, password);

        ensure(comparePass, "Invalid email or password", BAD_REQUEST);

        // mapper out
        const mapperOutToGetLoginUser = this._userMapper.mapperOutToGetLoginUser(userInfo);

        const token = generateToken(mapperOutToGetLoginUser);

        return {
            token,
            role: mapperOutToGetLoginUser.role,
        };
    }

    async getAllUserForSuperAdmin(body: IGetAllUserWithFilterDtoInQuery, user: { role: string }) {
        if (user.role !== EUserRole.SUPER_ADMIN) {
            throw new AppError("You are not authorized", FORBIDDEN);
        }

        const result = await this._userRepo.getAllUserForSuperAdmin(body);
        ensure(result, "Error in get user service", BAD_REQUEST);

        const count = await this._userRepo.getTotalUserCount(body);
        ensure(count !== null, "Error in get user count service", BAD_REQUEST);

        return {
            data: result,
            total: count,
            limit: body.limit,
        };
    }

    async deleteUserByAdmin(body: IDeleteUserByAdminDtoIn, user: { role: EUserRole }) {
        requireRole(user.role, EUserRole.SUPER_ADMIN);

        const deleteUser = await this._userRepo.deleteUserByAdmin(body);

        ensure(deleteUser, `Error on delete user with user id`, BAD_REQUEST);

        return deleteUser;
    }
}
