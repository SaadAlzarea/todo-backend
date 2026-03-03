import { ETodoPriority, ETodoStatus } from "../definition/enums/todo.enum";

export interface ITodoModel {
    generatedId: string;
    title: string;
    body: string;
    progress: String;
    priority: ETodoPriority;
    status: ETodoStatus;
}
