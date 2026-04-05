export interface IApiResponse<T = unknown> {
    statusCode: number;
    body: {
        message: string;
        data?: T;
        error?: string;
    };
}

export interface IEmptyApiResponse {
    statusCode: number;
    body: {
        message: string;
    };
}
