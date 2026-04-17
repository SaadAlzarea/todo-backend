import { type Static, Type } from "@sinclair/typebox";
import { Types } from "mongoose";
import { ETodoPriority, ETodoStatus } from "../../../definition";

// ! PERSONAL PROJECT
// * CREATE PROJECT
export const VCreatePersonalProjectDtoIn = Type.Object({
    project_name: Type.String(),
    project_deadline: Type.String(),
});

// * DELETE PERSONAL PROJECT
export const VDeletePersonalProjectDtoIn = Type.Object({
    project_id: Type.String(),
});

export const VGetAllPersonalProjectDtoOut = Type.Object({
    data: Type.Array(
        Type.Object({
            project_name: Type.String(),
            project_id: Type.String(),
            project_deadline: Type.String(),
            createdAt: Type.String(),
        }),
    ),
    message: Type.String(),
});

// ! TODOS

// * CREATE NEW TODO INSIDE PERSONAL PROJECT
export const VCreateNewTodoDoIn = Type.Object({
    project_id: Type.String(),
    title: Type.String({ minLength: 1 }),
    body: Type.String({ minLength: 1 }),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    todo_deadline: Type.String(),
});

// todo_id: uuid("todo_id").primaryKey().defaultRandom(),
// project_id: uuid("project_id")
//     .notNull()
//     .references(() => PersonalProjectTable.project_id, { onDelete: "cascade" }),
// user_id: uuid("user_id")
//     .notNull()
//     .references(() => UserTable.user_id, { onDelete: "cascade" }),
// title: varchar("title", { length: 255 }).notNull(),
// body: varchar("body").notNull(),
// priority: todoPriorityEnum("priority").default("low"),
// status: todoStatusEnum("status").default("in-progress"),
// todo_deadline: timestamp("todo_deadline"),
// createdAt: timestamp("created_at").defaultNow(),
// updatedAt: timestamp("updated_at").defaultNow(),

export const VCreateNewTodoDoOut = Type.Object({
    todo_id: Type.String(),
    title: Type.String({ minLength: 1 }),
    body: Type.String({ minLength: 1 }),
    progress: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    user_id: Type.String(),
});

// * DELETE TODO
export const VDeleteTodoByIdDtoIn = Type.Object({
    todo_id: Type.String(),
});

// * UPDATE TODO
export const VUpdateTodoDtoIn = Type.Object({
    todo_id: Type.Optional(Type.String()),
    title: Type.Optional(Type.String()),
    body: Type.Optional(Type.String()),
    progress: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Enum(ETodoPriority)),
    status: Type.Optional(Type.Enum(ETodoStatus)),
});

export const VUpdateTodoDtoOut = Type.Object({
    title: Type.String(),
    body: Type.String(),
    progress: Type.String(),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
});

// * GET ALL TODOS WITH FILTER
export const VTodosWithFilterDtoIn = Type.Object({
    todo_id: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Enum(ETodoPriority)),
    status: Type.Optional(Type.Enum(ETodoStatus)),
    page: Type.Optional(Type.Number({ minimum: 1 })),
    limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});

export const VTodosWithFilterDtoOut = Type.Object({
    data: Type.Object({
        data: Type.Array(
            Type.Object({
                todo_id: Type.String(),
                title: Type.String(),
                progress: Type.Optional(Type.String()),
                priority: Type.Enum(ETodoPriority),
                status: Type.Enum(ETodoStatus),
            }),
        ),
    }),
    page: Type.Number(),
    limit: Type.Number(),
    total: Type.Number(),
});

// * GET TODO DETAILS
export const VGetTodoDetailsDtoIn = Type.Object({
    todo_id: Type.String(),
});
export const VGetTodoDetailsDtoOut = Type.Object({
    todo_id: Type.String(),
    title: Type.String(),
    body: Type.String(),
    progress: Type.String(),
    priority: Type.Enum(ETodoPriority),
    status: Type.Enum(ETodoStatus),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
});

// * ASSIGN TODO
export const VAssignTodoDtoIn = Type.Object({
    assign_todo_id: Type.String(),
    assign_todo_from: Type.String(),
    assign_todo_to: Type.String(),
    title: Type.String(),
    body: Type.String(),
    progress: Type.Optional(Type.String()),
    priority: Type.String(),
    status: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});
