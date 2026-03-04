import { ILoginDto, IRegisterDto } from "../../domain/DTOs/user.dto";
import { AppError } from "../../middleware/errorMiddleware.middleware";
import { BAD_REQUEST } from "../../utils/http-status";
import { comparePassword, generateToken, hashPassword } from "../../utils/jwt.util";
import { UserRepo } from "../repo/user.repo";

export class UserService {
    constructor(private readonly _userRepo: UserRepo) {}

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

        // create user
        const newUser = await this._userRepo.createNewUser({
            username: username,
            email: email,
            password: hashPass,
        });

        // generate token
        const token = generateToken({
            id: newUser.generatedId,
            email: newUser.email,
            role: newUser.role,
        });

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
        const token = generateToken({
            id: userInfo.generatedId,
            email: userInfo.email,
            role: userInfo.role,
        });
        return {
            token,
        };
    }
}
