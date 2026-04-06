export interface IApiResponse<T> {
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
