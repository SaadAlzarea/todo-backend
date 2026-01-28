import { NextFunction, Request, Response } from "express";
import { validator } from "../adapter/validator.adapter";
import { VLoginDto, VRegisterDto } from "../domain/validation/register.validation";
import { BAD_REQUEST, CREATED, OK } from "../utils/http-status";
import { RegisterUser } from "../schema/register.schema";
import { AppError } from "../middleware/errorMiddleware.middleware";

export class Register {
    async registerNewUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        
            const body = req.body
            const { error: RegisterValidationError } = validator(VRegisterDto, body)
            if (RegisterValidationError.length > 0) {
                throw new AppError(`${RegisterValidationError}`, BAD_REQUEST)
            }

            // username check
            if(await RegisterUser.exists({username : req.body.username})){
                throw new AppError("username is exist", BAD_REQUEST)
            }

            //  email check
            if(await RegisterUser.exists({email : req.body.email})){
                throw new AppError("email is exist", BAD_REQUEST)
            }

        try { 
            const newUser = await RegisterUser.create(body)
            res.status(CREATED).json({
                message: `Registration successful`,
                data: newUser
            })
        } catch (error) {
            next(error)
        }
    }


    async login(req : Request, res :Response, next : NextFunction):Promise<void>{
        const body = req.body
        const {error : loginValidationError} = validator (VLoginDto, body)
        if (loginValidationError.length > 0){
            throw new AppError("input is not valid", BAD_REQUEST)
        }   

        try{
            const userInfo = await RegisterUser.findOne({email : req.body.email}).select("email password")
            if (userInfo?.password === req.body.password){
                res.status(OK).json({
                    message : `Login successfully`
                })
            }else{
                throw new AppError("email or password id not valid", BAD_REQUEST)
            }
        }catch (error){
            next(error)
        }
    }

    async getAllUser(req:Request, res:Response, next : NextFunction):Promise<void>{
        try{
            const allUser = await RegisterUser.find()
            res.status(OK).json({
                message : `fetch successfully`,
                data : allUser
            })
        }catch (error){
            res.status(BAD_REQUEST).json({
                message : `Error in fetch user information`,
                error:error
            })
        }
    }

}