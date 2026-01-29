import { NextFunction, Request, Response } from "express";
import { Actions, Subjects } from "../casl/casl.type";
import { defineAbility } from "@casl/ability";
import { AppError } from "./errorMiddleware.middleware";
import { UNAUTHORIZED } from "../utils/http-status";
import { defineAbilityFor } from "../casl/defineAbility.casl";

// export const authorize = (action: Actions, subject: string) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const ability = defineAbility((req as any).user);
//         console.log(req.headers.authorization);
//         if ((await ability).cannot(action, subject)) {
//             throw new AppError("You are not authorized to perform this action", UNAUTHORIZED);
//         }
//         next();
//     };
// };

export const authorize = (action: Actions, subject: Subjects) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        const ability = defineAbilityFor(user);

        if (ability.cannot(action, subject)) {
            throw new AppError("You are not authorized to perform this action", UNAUTHORIZED);
        }

        next();
    };
};
