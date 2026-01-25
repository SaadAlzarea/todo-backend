import { ETodoPriority, ETodoStatus } from "../definition/enums/todo.enum";

export interface ITodoModel {
	title: string;
	body: string;
	priority: ETodoPriority;
	status: ETodoStatus;
}
