import { NextFunction } from "express-serve-static-core";
import { Actions, Subjects, defineAbilityFor } from "../casl";
import { UNAUTHORIZED } from "../utils";
import { AppError } from "./errorMiddleware.middleware";

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
