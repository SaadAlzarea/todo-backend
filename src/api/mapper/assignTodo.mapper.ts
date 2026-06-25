import type { IUserPayload } from "../../definition";
import type {
    ICreateAssignTodoInGroupProjectDtoIn,
    ICreateAssignTodoInGroupProjectDtoInQuery,
} from "../../domain/DTOs/assignTodoDTO";

export class AssignTodoMapper {
    mapToAssignTodo_createAssignTodo(
        user: IUserPayload,
        body: ICreateAssignTodoInGroupProjectDtoIn,
        deadline: { deadline: Date },
    ): ICreateAssignTodoInGroupProjectDtoInQuery[] {
        return body.assign_to.map(({ user_id }) => ({
            group_id: body.group_id,
            project_id: body.project_id,
            assign_from: user.user_id,
            assign_to: user_id,
            title: body.title,
            body: body.body,
            priority: body.priority,
            status: body.status,
            deadline: deadline.deadline,
        }));
    }
}
