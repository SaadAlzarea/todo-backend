import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UNAUTHORIZED } from "../utils";

dotenv.config();
const secret = process.env.JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(UNAUTHORIZED).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(UNAUTHORIZED).json({ error: "Token is missing" });
    }

    try {
        const decoded = jwt.verify(token, secret) as { generatedId: string; role: string };
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(UNAUTHORIZED).json({ error: "Invalid or expired token" });
    }
};
