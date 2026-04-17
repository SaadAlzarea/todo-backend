import type { ICreatePersonalProjectDtoInQuery } from "../../domain";

export class PersonalProjectMapper {
    mapperToCreatePersonalProject(
        date: { project_deadline: Date },
        body: { project_name: string; project_deadline: string },
        userInfo: { user_id: string },
    ): ICreatePersonalProjectDtoInQuery {
        return {
            user_id: userInfo.user_id,
            project_name: body.project_name,
            project_deadline: date.project_deadline,
        };
    }
}
