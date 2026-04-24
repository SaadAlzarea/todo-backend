import type { EUserRole } from "../enums";

export interface HttpRequest<T = any> {
    body: T;
    params: any;
    query: any;
    headers: any;
    user?: { user_id: string; role: string };
    files?: any;

    // files: req.files;
    // file: req.file;
}

export interface HttpResponse<T = unknown> {
    statusCode: number;
    message?: string;
    data?: T;
}

export interface IUserPayload {
    user_id: string;
    roles: EUserRole[];
    email: string;
}
