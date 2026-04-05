export interface HttpRequest<T = any> {
    body: T;
    params: any;
    query: any;
    headers: any;
    user?: { user_id: string; role: string };
}

export interface HttpResponse {
    statusCode: number;
    body?: any;
    message?: string;
}
