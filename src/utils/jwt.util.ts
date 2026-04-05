import crypto from "crypto";
import dotenv from "dotenv";
import jwt, { type SignOptions } from "jsonwebtoken";
import { promisify } from "util";

dotenv.config();

const scryptAsync = promisify(crypto.scrypt);

export interface JwtPayload {
    user_id: string;
    role: string;
}

// to encrypt password
export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString("hex");

    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${salt}.${derivedKey.toString("hex")}`;
}

// to decrypt
export async function comparePassword(
    storedPassword: string,
    inputPassword: string,
): Promise<boolean> {
    const parts = storedPassword.split(".");

    if (parts.length !== 2) {
        return false;
    }

    const [salt, key] = parts as [string, string];

    const derivedKey = (await scryptAsync(inputPassword, salt, 64)) as Buffer;

    return crypto.timingSafeEqual(Buffer.from(key, "hex"), derivedKey);
}

// generate token
// const secret: jwt.Secret = process.env.JWT_SECRET as string;
const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (payload: JwtPayload): string => {
    const options: SignOptions = { expiresIn: "1h" };
    return jwt.sign(payload, secret, options);
};
