import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString("hex");

    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${salt}.${derivedKey.toString("hex")}`;
}

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
