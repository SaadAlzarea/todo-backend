import { AppError } from "../middleware";

export const ensure = (condition: unknown, message: string, status: number) => {
    const place = "in service";

    if (condition === undefined || condition === null) {
        throw new AppError(`${message} -- ${place}`, status);
    }
};
