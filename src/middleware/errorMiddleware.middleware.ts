import type { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../utils/http-status";

export class AppError extends Error {
    status: number;
    code?: string | undefined;

    constructor(message: string, status: number, code?: string) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    const status = err.status || INTERNAL_SERVER_ERROR;
    const message = err.message || "internal server error";
    const code = err.code || null;

    res.status(status).json({
        error: message,
        code: code,
    });
}
