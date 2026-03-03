import { Static } from "@sinclair/typebox";
import {
    VTodoDto,
    VTodoIdDto,
    VTodoFilterDto,
    VUpdateTodoDtoIn,
    VTodoFilterQuery,
    VDeleteTodoByIdDto,
} from "../validation/todo.validation";

export interface ITodoDto extends Static<typeof VTodoDto> {}

export interface ITodoIdDto extends Static<typeof VTodoIdDto> {}

export interface ITodoFiltersDto extends Static<typeof VTodoFilterDto> {}

export interface IUpdateTodoDtoIn extends Static<typeof VUpdateTodoDtoIn> {}

export interface ITodoFilterQuery extends Static<typeof VTodoFilterQuery> {}

export interface IDeleteTodoByIdDto extends Static<typeof VDeleteTodoByIdDto> {}
