export interface HttpRequest<T = any> {
    body: T;
    params: any;
    query: any;
    headers: any;
    user?: { generatedId: string; role: string };
}

export interface HttpResponse {
    statusCode: number;
    body?: any;
    message?: string;
}
