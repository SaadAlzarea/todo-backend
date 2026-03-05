import { ETodoPriority, ETodoStatus } from "../../definition";

export interface ITodoModel {
    generatedId: string;
    title: string;
    body: string;
    progress: String;
    priority: ETodoPriority;
    status: ETodoStatus;
    userId: string;
}
