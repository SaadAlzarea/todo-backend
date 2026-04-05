import { AppError } from "../middleware";

export const ensure = (condition: boolean, message: string, status: number) => {
    const place = "in service";
    if (!condition) {
        throw new AppError(`${message} -- ${place}`, status);
    }
};
