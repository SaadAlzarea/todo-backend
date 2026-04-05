import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { ETodoPriority, ETodoStatus, EUserRole } from "../../definition";

/**
 * * ENUMS
 */
export const userRoleEnum = pgEnum("user_role", EUserRole);
export const todoPriorityEnum = pgEnum("todo_priority", ETodoPriority);
export const todoStatusEnum = pgEnum("todo_status", ETodoStatus);

/**
 * * SCHEMAS
 */
export const UserTable = pgTable("users", {
    user_id: uuid("user_id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    email: varchar("email").notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: userRoleEnum("role").notNull().default(EUserRole.USER),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const TodoTable = pgTable("todos", {
    todo_id: uuid("todo_id").primaryKey().notNull().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    body: varchar("body").notNull(),
    progress: varchar("progress"),
    priority: todoPriorityEnum("priority").notNull(),
    status: todoStatusEnum("status").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    user_id: uuid("user_id")
        .notNull()
        .references(() => UserTable.user_id, {
            onDelete: "cascade",
        }),
});
