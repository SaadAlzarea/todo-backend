import { NextFunction, Request, Response } from "express";
import { validator } from "../adapter/validator.adapter";
import { BAD_REQUEST, CREATED, OK } from "../utils/http-status";
import { RegisterUser } from "../schema/user.schema";
import { AppError } from "../middleware/errorMiddleware.middleware";
import { comparePassword, generateToken, hashPassword } from "../utils/jwt.util";
import { VLoginDto, VRegisterDto } from "../validation/user.validation";
import { ILoginDto, IRegisterDto } from "../DTOs/user.dto";

export class User {
    async registerNewUser(
        req: Request<{}, {}, IRegisterDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const body = req.body;
        validator(VRegisterDto, body);

        // username check
        if (await RegisterUser.exists({ username: req.body.username })) {
            throw new AppError("username is exist", BAD_REQUEST);
        }

        //  email check
        if (await RegisterUser.exists({ email: req.body.email })) {
            throw new AppError("email is exist", BAD_REQUEST);
        }

        //hash password
        const hashPass = await hashPassword(req.body.password);

        try {
            const newUser = await RegisterUser.create({
                username: req.body.username,
                email: req.body.email,
                password: hashPass,
            });
            const token = generateToken({
                id: newUser.generatedId,
                email: newUser.email,
                role: newUser.role,
            });
            res.status(CREATED).json({
                message: `Registration successful`,
                token: token,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request<{}, {}, ILoginDto>, res: Response, next: NextFunction): Promise<void> {
        const body = req.body;
        validator(VLoginDto, body);

        try {
            const userInfo = await RegisterUser.findOne({ email: req.body.email }).select(
                "password email generatedId role",
            );
            if (!userInfo) {
                throw new AppError("Invalid email or password", BAD_REQUEST);
            }
            const comparePass = await comparePassword(userInfo.password, req.body.password);
            if (!comparePass) {
                throw new AppError("Invalid email or password", BAD_REQUEST);
            }
            const token = generateToken({
                id: userInfo.generatedId,
                email: userInfo.email,
                role: userInfo.role,
            });
            res.status(OK).json({
                message: "Login successful",
                token: token,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const allUser = await RegisterUser.find();
            res.status(OK).json({
                message: `fetch successfully`,
                data: allUser,
            });
        } catch (error) {
            res.status(BAD_REQUEST).json({
                message: `Error in fetch user information`,
                error: error,
            });
        }
    }
}
