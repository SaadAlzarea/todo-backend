// import { Ability, AbilityBuilder, createMongoAbility } from "@casl/ability";
// import { Actions, Subjects } from "./casl.type";
// import { EUserRole } from "../definition/enums/userRole.role";

// export function defineAbilityFor(user: { generatedId: string; role: string }) {
//     const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

//     if (user.role === EUserRole.SUPER_ADMIN) {
//         can("manage", "all");
//     } else if (user.role === EUserRole.ADMIN) {
//         can("list", "Todo");
//         can("create", "Todo");
//         can("update", "Todo");
//         can("delete", "Todo");
//         can("read", "User");
//     } else if (user.role === EUserRole.USER) {
//         can("read", "Todo");
//         can("create", "Todo");
//         can("update", "Todo", { userId: user.generatedId });
//         can("delete", "Todo", { userId: user.generatedId });
//     }

//     return build();
// }

import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { EUserRole } from "../definition/enums/user.enum";

export function defineAbilityFor(user: { generatedId: string; role: string }) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    // SUPER ADMIN
    if (user.role === EUserRole.SUPER_ADMIN) {
        can("manage", "all");
    }

    // ADMIN
    else if (user.role === EUserRole.ADMIN) {
        can("read", "User");
        can("manage", "Todo");
    }

    // USER
    else if (user.role === EUserRole.USER) {
        can("create", "Todo");
        can("read", "Todo", { userId: user.generatedId });
        can("update", "Todo", { userId: user.generatedId });
        can("delete", "Todo", { userId: user.generatedId });
    }

    return build();
}
