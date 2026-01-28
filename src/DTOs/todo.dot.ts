import { Static } from "@sinclair/typebox";
import { VTodoDto, VTodoFilterDto, VTodoIdDto } from "../validation/todo.validation";

export interface ITodoDto extends Static<typeof VTodoDto> {}

export interface ITodoIdDto extends Static<typeof VTodoIdDto> {}

export interface ITodoFiltersDto extends Static<typeof VTodoFilterDto> {}
