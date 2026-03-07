import { EUserRole } from "../../definition";
import { IRegisterDto, ILoginDto } from "../../domain";
import { AppError } from "../../middleware";
import { BAD_REQUEST, hashPassword, generateToken, comparePassword, FORBIDDEN } from "../../utils";
import { UserMapper } from "../mapper";
import { UserRepo } from "../repo";

export class UserService {
    constructor(
        private readonly _userRepo: UserRepo,
        private readonly _userMapper: UserMapper,
    ) {}

    async registerNewUser(body: IRegisterDto) {
        const { email, username, password } = body;

        // check inputs and hash pass
        if (await this._userRepo.checkUsername(username)) {
            throw new AppError("username is exist aa", BAD_REQUEST);
        }
        if (await this._userRepo.checkEmail(email)) {
            throw new AppError("Email Is exist bb", BAD_REQUEST);
        }
        const hashPass = await hashPassword(password);

        // mapper In
        const mapperInToNewUser = this._userMapper.mapperInToNewUser(body, hashPass);

        // create user
        const newUserInfo = await this._userRepo.createNewUser(mapperInToNewUser);

        // mapper out
        const mapperOutToNewUser = this._userMapper.mapperOutToNewUser(newUserInfo);

        // generate token
        const token = generateToken(mapperOutToNewUser);

        return {
            token,
        };
    }

    async login(body: ILoginDto) {
        const { password, email } = body;

        const userInfo = await this._userRepo.checkLoginEmailAndGetUserInfo(email);
        if (!userInfo) {
            throw new AppError("Invalid email or password", BAD_REQUEST);
        }

        const storedPassword = userInfo.password;
        const comparePass = await comparePassword(storedPassword, password);
        if (!comparePass) {
            throw new AppError("Invalid email or password", BAD_REQUEST);
        }

        // mapper out
        const mapperOutToGetLoginUser = this._userMapper.mapperOutToGetLoginUser(userInfo);

        const token = generateToken(mapperOutToGetLoginUser);

        return {
            token,
        };
    }
    async getAllUserForSuperAdmin(user: { role: string }) {
        const role = user.role;
        // check if this super admin or not
        if (role !== EUserRole.SUPER_ADMIN) {
            throw new AppError("You are not authorized to perform this action", FORBIDDEN);
        }
        const allUser = await this._userRepo.getAllUserForSuperAdmin();

        return allUser;
    }
}
