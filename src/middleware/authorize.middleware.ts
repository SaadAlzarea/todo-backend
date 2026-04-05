import type { RequestHandler } from "express";
import { Actions, defineAbilityFor, Subjects } from "../casl";
import { FORBIDDEN, UNAUTHORIZED } from "../utils";
import { AppError } from "./errorMiddleware.middleware";

export interface AuthRequest extends Request {
    user?: { user_id: string; role: string };
}
export function authorize(action: string, subject: string): RequestHandler {
    return (req, res, next) => {
        const user = (req as any).user;

        if (!user) {
            return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
        }
        if (!user?.user_id) {
            return res
                .status(UNAUTHORIZED)
                .json({ message: "Unauthorized there is no user id (errorMiddleware)" });
        }

        const ability = defineAbilityFor(user);

        if (!ability.can(action, subject)) {
            return res.status(FORBIDDEN).json({ message: "Forbidden" });
        }
        next();
    };
}
// export function authorize(action: string, subject: string): RequestHandler {
//     return async (req, res, next) => {
//         try {
//             const ability = defineAbilityFor((req as any).user);

//             if (!ability.can(action, subject)) {
//                 return res.status(403).json({ message: "Forbidden" });
//             }
//             next();
//         } catch (err) {
//             next(err);
//         }
//     };
// }
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
