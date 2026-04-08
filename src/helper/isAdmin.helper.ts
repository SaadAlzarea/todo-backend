import type { EUserRole } from "../definition";
import { AppError } from "../middleware";
import { UNAUTHORIZED } from "../utils";

export function requireRole(user_role: EUserRole, allowed: EUserRole) {
    if (user_role !== allowed) {
        throw new AppError("This User Unauthorized", UNAUTHORIZED);
    }
}
