import { Model } from "mongoose";
import { IRegisterModel, IRegisterDto } from "../../domain";
import { EUserRole } from "../../definition";

export class UserRepo {
    constructor(private readonly _userModel: Model<IRegisterModel>) {}

    async checkUsername(username: string) {
        return this._userModel.exists({ username });
    }

    async checkEmail(email: string) {
        return this._userModel.exists({ email });
    }

    async createNewUser(body: IRegisterDto) {
        return this._userModel.create(body);
    }

    async checkLoginEmailAndGetUserInfo(email: string) {
        return await this._userModel
            .findOne({ email: email })
            .select("password email generatedId role -_id");
    }

    async getAllUserForSuperAdmin() {
        return await this._userModel
            .find()
            .select("username email generatedId role createdAt updatedAt __v");
    }
}
