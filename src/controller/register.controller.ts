import { NextFunction, Request, Response } from "express";
import { validator } from "../adapter/validator.adapter";
import { VLoginDto, VRegisterDto } from "../domain/validation/register.validation";
import { BAD_REQUEST, CREATED, OK } from "../utils/http-status";
import { RegisterUser } from "../schema/register.schema";
import { AppError } from "../middleware/errorMiddleware.middleware";
import { comparePassword, hashPassword } from "../utils/jwt.util";

export class Register {
    async registerNewUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body;
        const { error: RegisterValidationError } = validator(VRegisterDto, body);
        if (RegisterValidationError.length > 0) {
            throw new AppError(`${RegisterValidationError}`, BAD_REQUEST);
        }

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
            res.status(CREATED).json({
                message: `Registration successful`,
                data: newUser,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body;
        const { error: loginValidationError } = validator(VLoginDto, body);
        if (loginValidationError.length > 0) {
            throw new AppError("input is not valid", BAD_REQUEST);
        }

        try {
            const userInfo = await RegisterUser.findOne({ email: req.body.email }).select(
                "password",
            );
            if (!userInfo) {
                throw new AppError("Invalid email or password", BAD_REQUEST);
            }
            const comparePass = await comparePassword(
                userInfo?.password as string,
                req.body.password,
            );
            if (!comparePass) {
                throw new AppError("Invalid email or password", BAD_REQUEST);
            }
            res.status(200).json({
                message: "Login successful",
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
