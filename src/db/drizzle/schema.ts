import { pgEnum, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

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

// * USER TABLE
export const UserTable = pgTable("users", {
    user_id: uuid("user_id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    email: varchar("email").notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: userRoleEnum("role").notNull().default("user"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// * PERSONAL PROJECT
export const PersonalProjectTable = pgTable("personal_projects", {
    project_id: uuid("project_id").primaryKey().defaultRandom(),
    project_name: varchar("project_name").notNull(),
    project_deadline: timestamp("project_deadline"),
    user_id: uuid("user_id")
        .notNull()
        .references(() => UserTable.user_id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
});

// * PERSONAL PROJECT TODO
export const PersonalProjectTodoTable = pgTable("todos", {
    todo_id: uuid("todo_id").primaryKey().defaultRandom(),
    project_id: uuid("project_id")
        .notNull()
        .references(() => PersonalProjectTable.project_id, { onDelete: "cascade" }),
    user_id: uuid("user_id")
        .notNull()
        .references(() => UserTable.user_id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    body: varchar("body").notNull(),
    priority: todoPriorityEnum("priority").default("low"),
    status: todoStatusEnum("status").default("in-progress"),
    todo_deadline: timestamp("todo_deadline"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// * GROUP TABLE PROJECT
export const GroupTable = pgTable("groups", {
    group_id: uuid("group_id").primaryKey().notNull().defaultRandom(),
    group_name: varchar("group_name").notNull(),
    created_by: uuid("created_by").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
});

// * GROUP MEMBERS
export const GroupMemberTable = pgTable(
    "group_members",
    {
        group_member_id: uuid("group_member_id").primaryKey().defaultRandom(),
        group_id: uuid("group_id")
            .notNull()
            .references(() => GroupTable.group_id, { onDelete: "cascade" }),
        user_id: uuid("user_id")
            .notNull()
            .references(() => UserTable.user_id, { onDelete: "cascade" }),
        group_member_role: userGroupMemberEnum("group_member_role").notNull(),
    },
    (table) => ({
        uniqueUserGroup: uniqueIndex("unique_user_group").on(table.user_id, table.group_id),
    }),
);

// * GROUP TODO (has assign from and assign to)
export const AssignTodo = pgTable("assign_todo", {
    assign_todo_id: uuid("assign_todo_id").primaryKey().defaultRandom(),
    group_id: uuid("group_id")
        .notNull()
        .references(() => GroupTable.group_id, { onDelete: "cascade" }),
    assign_from: uuid("assign_todo_from")
        .notNull()
        .references(() => UserTable.user_id),
    assign_to: uuid("assign_todo_to")
        .notNull()
        .references(() => UserTable.user_id),
    title: varchar("title", { length: 255 }).notNull(),
    body: varchar("body").notNull(),
    priority: todoPriorityEnum("priority").default("low"),
    status: todoStatusEnum("status").default("in-progress"),
    deadline: timestamp("deadline"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
