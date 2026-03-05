import type { Request, Response, NextFunction } from "express";
import type { HttpRequest } from "../definition";

export const expressAdapter = (controller: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const httpRequest: HttpRequest = {
                body: req.body,
                params: req.params,
                query: req.query,
                headers: req.headers,
                user: (req as any).user,
            };
            const response = await controller(httpRequest);
            return res.status(response.statusCode).json(response.body);
        } catch (error) {
            next(error);
        }
    };
};
