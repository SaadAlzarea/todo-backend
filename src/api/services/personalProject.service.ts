import type { IDeletePersonalProjectDtoIn } from "../../domain";
import type { ICreatePersonalProjectDtoIn } from "../../domain/DTOs/todoDTO/todo.query.dto";
import { ensure } from "../../helper";
import { BAD_REQUEST } from "../../utils";
import type { PersonalProjectMapper } from "../mapper";
import type { PersonalProjectRepo } from "../repo";

export class PersonalProjectService {
    constructor(
        private readonly _personalProjectRepo: PersonalProjectRepo,
        private readonly _personalProjectMapper: PersonalProjectMapper,
        private readonly _db: any,
    ) {}

    async createPersonalProject(
        date: { project_deadline: Date },
        body: ICreatePersonalProjectDtoIn,
        userinfo: { user_id: string },
    ) {
        const mapperToCreatePersonalProject =
            this._personalProjectMapper.mapperToCreatePersonalProject(date, body, userinfo);

        const createdProject = await this._personalProjectRepo.createdProject(
            mapperToCreatePersonalProject,
        );
        ensure(
            createdProject,
            `Error in create project with name :${body.project_name}`,
            BAD_REQUEST,
        );

        return createdProject;
    }

    async deletePersonalProject(body: IDeletePersonalProjectDtoIn) {
        const deletedPersonalProject = await this._personalProjectRepo.deletePersonalProject(body);

        ensure(
            deletedPersonalProject,
            `Error in delete Personal project with id ${body.project_id}`,
            BAD_REQUEST,
        );

        return deletedPersonalProject;
    }

    async getAllPersonalProject(body: { user_id: string }) {
        const allPersonalProject = await this._personalProjectRepo.getAllPersonalProject(body);
        ensure(allPersonalProject, `Error in get personal projects`, BAD_REQUEST);

        return allPersonalProject;
    }
}
