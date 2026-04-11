import { table } from "node:console";
import { pgEnum, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { ETodoPriority, ETodoStatus, EUserRole } from "../../definition";

/**
 * * ENUMS
 */
export const userRoleEnum = pgEnum("user_role", ["super-admin", "admin", "user"]);
export const todoPriorityEnum = pgEnum("todo_priority", ["critical", "high", "medium", "low"]);
export const todoStatusEnum = pgEnum("todo_status", [
    "active",
    "in-progress",
    "archived",
    "canceled",
]);
export const userGroupMemberEnum = pgEnum("group_member_role", ["admin", "member"]);

/**
 * * SCHEMAS
 */
export const UserTable = pgTable("users", {
    user_id: uuid("user_id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    email: varchar("email").notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: userRoleEnum("role").notNull().default("user"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const TodoTable = pgTable("todos", {
    todo_id: uuid("todo_id").primaryKey().notNull().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    body: varchar("body").notNull(),
    progress: varchar("progress"),
    priority: todoPriorityEnum("priority").notNull().default("low"),
    status: todoStatusEnum("status").notNull().default("in-progress"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    user_id: uuid("user_id")
        .notNull()
        .references(() => UserTable.user_id, {
            onDelete: "cascade",
        }),
});

export const GroupTable = pgTable("groups", {
    group_id: uuid("group_Id").primaryKey().notNull().defaultRandom(),
    group_name: varchar("group_name").notNull(),
    created_by: uuid("created_by").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
});

export const GroupMemberTable = pgTable(
    "group_members",
    {
        group_member_id: uuid("group_member_id").primaryKey().notNull().defaultRandom(),
        group_id: uuid("group_id").notNull(),
        user_id: uuid("user_id").notNull(),
        group_member_role: userGroupMemberEnum("group_member_role").notNull(),
    },
    // if user exist (u can't add user two times)
    (table) => ({
        uniqueUserGroup: uniqueIndex("unique_user_group").on(table.user_id, table.group_id),
    }),
);
