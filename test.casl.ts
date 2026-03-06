import { defineAbilityFor } from "./src/casl";
import { EUserRole } from "./src/definition";

const user = {
    generatedId: "123",
    role: EUserRole.SUPER_ADMIN,
};

const ability = defineAbilityFor(user);

console.log("can read Todo:", ability.can("read", "Todo"));
console.log("can create Todo:", ability.can("create", "Todo"));
console.log("can update Todo:", ability.can("update", "Todo"));
console.log("can delete Todo:", ability.can("delete", "Todo"));
console.log("can read User:", ability.can("read", "User"));

// run command : npx ts-node test.casl.ts
