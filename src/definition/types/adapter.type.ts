export interface HttpRequest<T = any> {
    body: T;
    params: any;
    query: any;
    headers: any;
}

export interface HttpResponse {
    statusCode: number;
    body?: any;
    message?: string;
}
