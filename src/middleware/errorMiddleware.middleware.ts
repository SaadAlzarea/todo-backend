import type { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../utils/http-status";

export class AppError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    const status = err.status || INTERNAL_SERVER_ERROR;
    const message = err.message || "internal server error";

    res.status(status).json({ error: `${message}` });
}
