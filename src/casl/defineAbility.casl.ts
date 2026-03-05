// import { AbilityBuilder, createMongoAbility } from "@casl/ability";
// import { Actions, Subjects } from "./casl.type";
// import { EUserRole } from "../definition/enums/userRole.role";

// export function defineAbilityFor(user: any) {
//     const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

//     if (user.role === EUserRole.SUPER_ADMIN) {
//         can("list", "Todo");
//         can("create", "Todo");
//         can("update", "Todo");
//         can("delete", "Todo");
//         can("read", "User");
//         can("create", "User");
//         can("update", "User");
//         can("delete", "User");
//     } else if (user.role === EUserRole.ADMIN) {
//         can("list", "Todo");
//         can("create", "Todo");
//         can("update", "Todo");
//         can("delete", "Todo");
//         can("read", "Todo");
//         can("read", "User");
//     } else if (user.role === EUserRole.USER) {
//         can("read", "Todo");
//         can("create", "Todo");
//         can("update", "Todo", { userId: user.generatedId });
//         can("delete", "Todo", { userId: user.generatedId });

//         // cannot("delete", "Todo", { completed: true });
//     }

//     return build();
// }

import { Ability, AbilityBuilder, createMongoAbility } from "@casl/ability";
import { Actions, Subjects } from "./casl.type";
import { EUserRole } from "../definition/enums/userRole.role";

export function defineAbilityFor(user: { generatedId: string; role: string }) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.role === EUserRole.SUPER_ADMIN) {
        can("manage", "all");
    } else if (user.role === EUserRole.ADMIN) {
        can("list", "Todo");
        can("create", "Todo");
        can("update", "Todo");
        can("delete", "Todo");
        can("read", "User");
    } else if (user.role === EUserRole.USER) {
        can("read", "Todo");
        can("create", "Todo");
        can("update", "Todo", { userId: user.generatedId });
        can("delete", "Todo", { userId: user.generatedId });
    }

    return build();
}

// const ability = defineAbilityFor();
// const isAllowed = ability.can("manage", "Todo");
// console.log(isAllowed);
